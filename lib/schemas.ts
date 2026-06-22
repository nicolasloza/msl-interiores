import { z } from 'zod';

const TIPOS = [
  'Proyecto integral',
  'Dirección de obra',
  'Proyecto integral + Dirección de obra',
] as const;

const galleryImageSchema = z.object({
  url: z.string().url('Cada imagen debe tener una URL válida'),
  publicId: z.string().nullable().optional(),
});

const detailItemSchema = z.object({
  label: z.string(),
  value: z.string(),
});

// Reglas de validación sin defaults — base compartida entre create y update
const projectFields = {
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  name:       z.string().min(1, 'El nombre es requerido'),
  category:   z.string(),
  location:   z.string().min(1, 'La ubicación es requerida'),
  year:       z.number().int().min(2000, 'El año debe ser 2000 o posterior').max(2100, 'El año no es válido'),
  img:        z.string().min(1, 'La imagen principal es requerida'),
  gallery:    z.array(galleryImageSchema),
  superficie: z.number().min(0, 'La superficie no puede ser negativa'),
  tipo:       z.enum(TIPOS),
  details:    z.array(detailItemSchema),
  desafio:   z.string(),
  propuesta: z.string(),
  resultado: z.string(),
  publicado: z.boolean(),
  orden:     z.number().int().min(1),
};

// Schema para CREATE — agrega defaults sobre las reglas base
export const projectCreateSchema = z.object({
  ...projectFields,
  category:   projectFields.category.default('Residencial'),
  gallery:    projectFields.gallery.default([]),
  superficie: projectFields.superficie.default(0),
  tipo:       projectFields.tipo.default('Proyecto integral'),
  details:    projectFields.details.default([]),
  desafio:    projectFields.desafio.default(''),
  propuesta:  projectFields.propuesta.default(''),
  resultado:  projectFields.resultado.default(''),
  publicado:  projectFields.publicado.default(true),
  orden:      projectFields.orden.default(999),
});

// Schema para UPDATE — todo opcional, sin defaults, rechaza body vacío
export const projectUpdateSchema = z
  .object(projectFields)
  .partial()
  .refine((d) => Object.keys(d).length > 0, { message: 'El body no puede estar vacío' });

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;
