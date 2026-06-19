/**
 * Backfill: rellena publicId en ProjectImage para filas que lo tengan null.
 * Extrae el public_id parseando la URL de Cloudinary.
 *
 * Uso:
 *   npx tsx prisma/backfill-public-ids.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function extractPublicId(url: string): string | null {
  const idx = url.indexOf('/upload/');
  if (idx === -1) return null;

  let path = url.slice(idx + '/upload/'.length);
  path = path.replace(/\.[^./]+$/, '');

  const parts = path.split('/').filter(
    (seg) =>
      seg &&
      !/^v\d+$/.test(seg) &&
      !/,/.test(seg) &&
      !/^[a-z]{1,3}_[a-zA-Z0-9]/.test(seg)
  );

  return parts.join('/') || null;
}

async function main() {
  const rows = await prisma.projectImage.findMany({
    where: { publicId: null },
    select: { id: true, url: true },
  });

  console.log(`Encontradas ${rows.length} filas sin publicId.`);

  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    const publicId = extractPublicId(row.url);
    if (!publicId) {
      console.warn(`  [SKIP] id=${row.id} — no se pudo extraer de: ${row.url}`);
      skipped++;
      continue;
    }

    await prisma.projectImage.update({
      where: { id: row.id },
      data: { publicId },
    });

    console.log(`  [OK]   id=${row.id} → ${publicId}`);
    updated++;
  }

  console.log(`\nListo. Actualizadas: ${updated} | Saltadas: ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
