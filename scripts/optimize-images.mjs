// Mengubah reference/img → public/img (WebP + JPG cadangan, ukuran wajar) dan membuat og-image.
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import { join, parse } from 'node:path'

const SRC = 'reference/img'
const OUT = 'public/img'
const MAX = { 'sinta-wisuda': 1200, 'sinta-cafe': 480, hki: 1400, jurnal: 1200 } // lebar maksimum
const DEFAULT_MAX = 1100
const CROP = { 'cert-dicoding': { left: 0, top: 0, width: 1083, height: 1545 } } // buang sisa halaman ke-3 yang terpotong

await mkdir(OUT, { recursive: true })
for (const f of await readdir(SRC)) {
  const { name, ext } = parse(f)
  if (!/\.jpe?g$/i.test(ext)) continue
  const w = MAX[name] ?? DEFAULT_MAX
  let src = sharp(join(SRC, f)).rotate()
  if (CROP[name]) src = src.extract(CROP[name])
  const base = src.resize({ width: w, withoutEnlargement: true })
  const meta = await sharp(join(SRC, f)).metadata()
  await base.clone().webp({ quality: 80 }).toFile(join(OUT, `${name}.webp`))
  await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `${name}.jpg`))
  console.log(name, `${meta.width}x${meta.height}`)
}
// og:image 1200x630 dari foto wisuda
await sharp(join(SRC, 'sinta-wisuda.jpg')).resize(1200, 630, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, 'og-image.jpg'))
