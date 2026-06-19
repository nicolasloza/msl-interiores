import { describe, it, expect } from 'vitest';
import { projectCreateSchema, projectUpdateSchema } from '../schemas';

const validProject = {
  slug: 'departamento-palermo',
  name: 'Departamento Palermo',
  location: 'CABA',
  year: 2024,
  img: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
};

// ─── projectCreateSchema ──────────────────────────────────────────────────────

describe('projectCreateSchema — casos válidos', () => {
  it('acepta un proyecto mínimo válido (el resto con defaults)', () => {
    const result = projectCreateSchema.safeParse(validProject);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.category).toBe('Residencial');
      expect(result.data.publicado).toBe(true);
      expect(result.data.gallery).toEqual([]);
    }
  });

  it('acepta el tipo de proyecto "Dirección de obra"', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, tipo: 'Dirección de obra' });
    expect(result.success).toBe(true);
  });
});

describe('projectCreateSchema — casos inválidos', () => {
  it('rechaza slug vacío', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, slug: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.slug).toContain('El slug es requerido');
    }
  });

  it('rechaza slug con mayúsculas', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, slug: 'Mi-Proyecto' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.slug?.[0]).toMatch(/minúsculas/);
    }
  });

  it('rechaza slug con espacios', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, slug: 'mi proyecto' });
    expect(result.success).toBe(false);
  });

  it('rechaza name vacío', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, name: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toContain('El nombre es requerido');
    }
  });

  it('rechaza location vacía', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, location: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.location).toContain('La ubicación es requerida');
    }
  });

  it('rechaza year menor a 2000', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, year: 1999 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.year?.[0]).toMatch(/2000/);
    }
  });

  it('rechaza year mayor a 2100', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, year: 2101 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.year?.[0]).toMatch(/válido/);
    }
  });

  it('rechaza superficie negativa', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, superficie: -1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.superficie?.[0]).toMatch(/negativa/);
    }
  });

  it('rechaza tipo fuera del enum', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, tipo: 'Reforma' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.tipo).toBeDefined();
    }
  });

  it('rechaza img vacía', () => {
    const result = projectCreateSchema.safeParse({ ...validProject, img: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.img).toContain('La imagen principal es requerida');
    }
  });

  it('rechaza gallery con URL inválida', () => {
    const result = projectCreateSchema.safeParse({
      ...validProject,
      gallery: [{ url: 'no-es-una-url' }],
    });
    expect(result.success).toBe(false);
  });
});

// ─── projectUpdateSchema ──────────────────────────────────────────────────────

describe('projectUpdateSchema', () => {
  it('acepta un body parcial válido', () => {
    const result = projectUpdateSchema.safeParse({ name: 'Nuevo nombre' });
    expect(result.success).toBe(true);
  });

  it('rechaza body completamente vacío', () => {
    const result = projectUpdateSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().formErrors).toContain('El body no puede estar vacío');
    }
  });

  it('rechaza slug con caracteres inválidos si se manda', () => {
    const result = projectUpdateSchema.safeParse({ slug: 'MI SLUG' });
    expect(result.success).toBe(false);
  });

  it('rechaza year inválido si se manda', () => {
    const result = projectUpdateSchema.safeParse({ year: 1800 });
    expect(result.success).toBe(false);
  });
});
