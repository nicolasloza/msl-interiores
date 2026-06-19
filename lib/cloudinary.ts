export function extractPublicId(url: string): string | null {
  const idx = url.indexOf('/upload/');
  if (idx === -1) return null;

  let path = url.slice(idx + '/upload/'.length);
  path = path.replace(/\.[^./]+$/, '');

  const publicIdParts = path.split('/').filter((seg) =>
    seg &&
    !/^v\d+$/.test(seg) &&
    !/,/.test(seg) &&
    !/^[a-z]{1,3}_[a-zA-Z0-9]/.test(seg)
  );

  return publicIdParts.join('/') || null;
}

type ImageRef = { url: string; publicId?: string | null };

export async function deleteCloudinaryImages(images: ImageRef[]): Promise<void> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret || apiKey === 'REEMPLAZAR') return;

  const publicIds = images
    .map((img) => img.publicId ?? (img.url.includes('cloudinary.com') ? extractPublicId(img.url) : null))
    .filter((id): id is string => Boolean(id));

  if (!publicIds.length) return;

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const params = new URLSearchParams();
  publicIds.forEach((id) => params.append('public_ids[]', id));

  await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?${params}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Basic ${credentials}` },
    }
  );
}
