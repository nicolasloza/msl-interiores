# MSL Interiores

Sitio web portfolio para un estudio de diseño de interiores residencial. Incluye galería de proyectos pública y panel de administración para gestionar contenido.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v3** para estilos del sitio público
- **MUI v6** (Material UI + Emotion) para el panel admin
- **Prisma v5** + **PostgreSQL** (Supabase)
- **Auth.js v5** (NextAuth) — autenticación por credenciales, sesión JWT
- **Cloudinary** — almacenamiento y subida de imágenes
- **Nodemailer** — envío de emails desde el formulario de contacto

## Estructura de rutas

```
/                        → Landing (Hero, Proyectos, Servicios, Proceso, Nosotros, Contacto)
/proyectos/[slug]        → Detalle de proyecto con galería lightbox
/admin/login             → Login del panel admin
/admin/proyectos         → Listado y gestión de proyectos
/admin/proyectos/nuevo   → Crear proyecto
/admin/proyectos/[id]    → Editar proyecto
/admin/contenido         → Editar secciones del sitio (Nosotros, Servicios, etc.)
/admin/perfil            → Cambiar contraseña del administrador
```

## Variables de entorno

Crear un archivo `.env.local` con las siguientes variables:

```env
# Base de datos (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth.js
AUTH_SECRET="..."

# Fallback de autenticación (sin DB configurada)
ADMIN_EMAIL="admin@ejemplo.com"
ADMIN_PASSWORD="contraseña-segura"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
CLOUDINARY_UPLOAD_PRESET="..."

# Nodemailer (Gmail)
GMAIL_USER="..."
GMAIL_APP_PASSWORD="..."
```

## Comandos

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Base de datos
npm run db:push        # Aplica el schema sin migración
npm run db:migrate     # Crea y aplica una migración
npm run db:seed        # Carga datos iniciales
npm run db:studio      # Abre Prisma Studio
```

## Modelos de base de datos

| Modelo | Descripción |
|---|---|
| `User` | Administradores con email, contraseña hasheada y rol |
| `Project` | Proyectos del portfolio con slug único, categoría, imágenes y textos |
| `ProjectImage` | Imágenes individuales de cada proyecto (Cloudinary URLs) |
| `SiteContent` | Secciones editables del sitio almacenadas como JSON |

## Panel de administración

Accesible en `/admin/login`. Requiere credenciales de usuario en la base de datos (o las variables `ADMIN_EMAIL`/`ADMIN_PASSWORD` como fallback).

Funcionalidades:
- Crear, editar y eliminar proyectos (con subida de imágenes a Cloudinary)
- Reordenar imágenes dentro de un proyecto mediante drag & drop
- Publicar/despublicar proyectos
- Editar el contenido de las secciones del sitio público
- Cambiar la contraseña del administrador

## Deploy

El proyecto está configurado para Vercel. Las imágenes remotas permitidas son `res.cloudinary.com` e `images.unsplash.com`.
