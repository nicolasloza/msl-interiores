# Checklist de smoke tests manuales

Estos tests requieren un entorno local con `.env.local` real (Cloudinary, Gmail SMTP, Postgres).
Antes de empezar: `npm run dev` y verificar que la DB responde.

---

## Imágenes y Cloudinary

### Subir una imagen nueva
1. Ir a `/admin/proyectos` y abrir un proyecto existente para editar.
2. En la sección "Galería de imágenes", hacer clic en **Subir desde PC** y subir una imagen nueva.
3. Guardar el proyecto.
4. **Verificar en Cloudinary Dashboard** (Media Library) que la imagen aparece en la carpeta `msl-interiores/proyectos/<slug>`.
5. **Verificar en la base de datos** (Prisma Studio: `npm run db:studio`) que la fila correspondiente en `ProjectImage` tiene `publicId` no nulo.

### Eliminar una imagen de la galería
1. En el mismo proyecto, quitar la imagen recién subida de la galería haciendo clic en el ícono de eliminación.
2. Guardar el proyecto.
3. **Verificar en Cloudinary Dashboard** que el archivo ya no existe (puede tardar unos segundos).
4. **Verificar en la DB** que la fila de `ProjectImage` fue eliminada.

---

## Formulario de contacto

### Envío normal
1. Ir a la sección de contacto del sitio público.
2. Completar nombre, email y mensaje con datos reales y enviar.
3. **Verificar** que la página muestra el mensaje de éxito ("¡Gracias por tu mensaje!").
4. **Verificar** que llega un mail al estudio (dirección configurada en `CONTACT_TO` o `GMAIL_USER`).
5. **Verificar** que llega un mail de confirmación al email ingresado en el formulario, con el texto del mensaje como referencia y el remitente "MSL Interiores (sin respuesta)".

### Honeypot
1. Abrir DevTools → Elements, localizar el input oculto dentro del formulario de contacto.
2. Darle un valor de texto cualquiera (ej: "test").
3. Completar el resto de los campos normalmente y enviar.
4. **Verificar** que la respuesta del servidor es `200 OK` (sin error en la UI).
5. **Verificar** que NO llega ningún mail al estudio ni al remitente.

### Rate limiting
1. Enviar el formulario de contacto 5 veces seguidas en menos de 10 minutos desde la misma IP (con datos válidos cada vez).
2. En el 6° intento, **verificar** que el servidor responde con error y la UI muestra "Demasiados intentos. Esperá unos minutos antes de reintentar."

---

## Validación con Zod en el panel admin

### Campo inválido en la API
1. Desde DevTools o un cliente HTTP (ej: curl, Postman), hacer `POST /api/admin/proyectos` con body:
   ```json
   { "slug": "mi proyecto", "name": "", "year": 1800, "superficie": -5, "img": "x", "location": "CABA" }
   ```
2. **Verificar** que la respuesta es `400` con body `{ "error": "Datos inválidos", "campos": { ... } }` listando los campos inválidos.
3. **Verificar** que no aparece ningún error 500 en los logs del servidor.

---

## Instalación limpia

1. En una carpeta nueva, clonar el repositorio.
2. Correr `npm ci` (no `npm install`).
3. **Verificar** que termina sin errores y que las versiones instaladas coinciden exactamente con `package-lock.json`.
4. Correr `npm run build` y verificar que compila sin errores.
