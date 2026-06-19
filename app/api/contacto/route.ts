import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkRateLimit } from '@/lib/rate-limit';

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 });
  }

  const { nombre, email, mensaje, website } = body as Record<string, string>;

  if (website) return NextResponse.json({ ok: true });

  const ip = getIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Esperá unos minutos antes de reintentar.' },
      { status: 429 }
    );
  }

  if (!nombre?.trim() || !email?.trim() || !mensaje?.trim()) {
    return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('Faltan variables de entorno: GMAIL_USER o GMAIL_APP_PASSWORD');
    return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8" /></head>
    <body style="font-family: Georgia, serif; color: #2C2420; max-width: 600px; margin: 0 auto; padding: 40px 32px; background: #FDFAF5;">
      <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8B6F47; margin: 0 0 24px;">
        MSL Interiores · Nuevo mensaje desde la web
      </p>
      <h1 style="font-size: 28px; font-weight: 400; margin: 0 0 32px; border-bottom: 1px solid #D4C5A9; padding-bottom: 20px;">
        ${escapeHtml(nombre)}
      </h1>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #EDE8E0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #8B6F47; width: 120px;">
            Nombre
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #EDE8E0; font-size: 15px;">
            ${escapeHtml(nombre)}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #EDE8E0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #8B6F47;">
            Email
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #EDE8E0; font-size: 15px;">
            <a href="mailto:${escapeHtml(email)}" style="color: #8B6F47;">${escapeHtml(email)}</a>
          </td>
        </tr>
      </table>
      <div style="background: #F0EBE1; padding: 28px; border-left: 3px solid #D4C5A9;">
        <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #8B6F47; margin: 0 0 16px;">
          Mensaje
        </p>
        <p style="font-size: 15px; line-height: 1.85; margin: 0; white-space: pre-wrap;">
          ${escapeHtml(mensaje)}
        </p>
      </div>
      <p style="margin-top: 40px; font-size: 12px; color: rgba(44,36,32,0.35); border-top: 1px solid #EDE8E0; padding-top: 20px;">
        MSL Interiores · Diseño de interiores residencial
      </p>
    </body>
    </html>
  `;

  const htmlConfirmacion = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8" /></head>
    <body style="font-family: Georgia, serif; color: #2C2420; max-width: 600px; margin: 0 auto; padding: 40px 32px; background: #FDFAF5;">
      <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #8B6F47; margin: 0 0 24px;">
        MSL Interiores
      </p>
      <h1 style="font-size: 28px; font-weight: 400; margin: 0 0 24px; border-bottom: 1px solid #D4C5A9; padding-bottom: 20px;">
        Recibimos tu mensaje, ${escapeHtml(nombre)}
      </h1>
      <p style="font-size: 15px; line-height: 1.85; color: #2C2420; margin: 0 0 32px;">
        Gracias por escribirnos. Leímos tu consulta y te vamos a responder a la brevedad.
      </p>
      <div style="background: #F0EBE1; padding: 28px; border-left: 3px solid #D4C5A9; margin-bottom: 40px;">
        <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #8B6F47; margin: 0 0 16px;">
          Tu mensaje
        </p>
        <p style="font-size: 15px; line-height: 1.85; margin: 0; white-space: pre-wrap;">
          ${escapeHtml(mensaje)}
        </p>
      </div>
      <p style="font-size: 12px; color: rgba(44,36,32,0.35); border-top: 1px solid #EDE8E0; padding-top: 20px; margin: 0;">
        Por favor no respondas este correo — para contactarnos usá el formulario en el sitio.
      </p>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"MSL Interiores" <${GMAIL_USER}>`,
      to: CONTACT_TO || GMAIL_USER,
      replyTo: email,
      subject: `[CONTACTO] Nuevo mensaje de ${nombre}`,
      html,
    });

    // Confirmación al remitente — fallo silencioso, no bloquea la respuesta
    transporter.sendMail({
      from: `"MSL Interiores (sin respuesta)" <${GMAIL_USER}>`,
      to: email,
      subject: 'Recibimos tu mensaje — MSL Interiores',
      html: htmlConfirmacion,
    }).catch((err) => console.error('Error al enviar confirmación al remitente:', err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error al enviar email:', err);
    return NextResponse.json({ error: 'No se pudo enviar el mensaje. Intentá de nuevo.' }, { status: 500 });
  }
}
