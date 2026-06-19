import { describe, it, expect, vi, beforeEach } from 'vitest';
import { extractPublicId, deleteCloudinaryImages } from '../cloudinary';

// ─── extractPublicId ──────────────────────────────────────────────────────────

describe('extractPublicId', () => {
  it('extrae el public_id de una URL simple', () => {
    expect(extractPublicId('https://res.cloudinary.com/demo/image/upload/sample.jpg'))
      .toBe('sample');
  });

  it('extrae el public_id con subcarpetas', () => {
    expect(extractPublicId('https://res.cloudinary.com/demo/image/upload/msl-interiores/proyectos/slug/imagen.jpg'))
      .toBe('msl-interiores/proyectos/slug/imagen');
  });

  it('filtra el segmento de versión (v1234567)', () => {
    expect(extractPublicId('https://res.cloudinary.com/demo/image/upload/v1700000000/sample.jpg'))
      .toBe('sample');
  });

  it('filtra transformaciones (f_auto,q_auto)', () => {
    expect(extractPublicId('https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample.jpg'))
      .toBe('sample');
  });

  it('filtra versión y transformaciones combinadas', () => {
    expect(extractPublicId('https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/v1700000000/msl-interiores/foto.jpg'))
      .toBe('msl-interiores/foto');
  });

  it('devuelve null para URLs que no son de Cloudinary', () => {
    expect(extractPublicId('https://images.unsplash.com/photo-123')).toBeNull();
  });

  it('devuelve null para URLs sin /upload/', () => {
    expect(extractPublicId('https://res.cloudinary.com/demo/image/fetch/sample.jpg')).toBeNull();
  });
});

// ─── deleteCloudinaryImages ───────────────────────────────────────────────────

describe('deleteCloudinaryImages', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'testcloud');
    vi.stubEnv('CLOUDINARY_API_KEY', 'testkey');
    vi.stubEnv('CLOUDINARY_API_SECRET', 'testsecret');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
  });

  it('usa publicId directo sin parsear la URL', async () => {
    await deleteCloudinaryImages([{ url: 'https://res.cloudinary.com/x/image/upload/foo.jpg', publicId: 'mi-public-id' }]);

    const [url, opts] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toContain('public_ids%5B%5D=mi-public-id');
    expect(url).not.toContain('foo');
    expect(opts.method).toBe('DELETE');
  });

  it('parsea la URL como fallback cuando no hay publicId', async () => {
    await deleteCloudinaryImages([{ url: 'https://res.cloudinary.com/x/image/upload/fallback-id.jpg' }]);

    const [url] = (fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(url).toContain('fallback-id');
  });

  it('no llama a fetch si la lista está vacía', async () => {
    await deleteCloudinaryImages([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('no llama a fetch si las credenciales no están configuradas', async () => {
    vi.stubEnv('CLOUDINARY_API_KEY', '');
    await deleteCloudinaryImages([{ url: 'https://res.cloudinary.com/x/image/upload/algo.jpg' }]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('no llama a fetch si la URL no es de Cloudinary y no hay publicId', async () => {
    await deleteCloudinaryImages([{ url: 'https://images.unsplash.com/photo-123' }]);
    expect(fetch).not.toHaveBeenCalled();
  });
});
