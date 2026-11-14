import type { Img } from '../data/content'

const base = import.meta.env.BASE_URL

export const imgUrl = (name: string, ext: 'webp' | 'jpg') => `${base}img/${name}.${ext}`

interface Props {
  img: Img
  className?: string
  /** true hanya untuk gambar di atas lipatan (hero) */
  eager?: boolean
  alt?: string
}

/** WebP dengan cadangan JPG, ukuran eksplisit agar tidak ada layout shift. */
export function Picture({ img, className, eager, alt }: Props) {
  return (
    <picture>
      <source srcSet={imgUrl(img.name, 'webp')} type="image/webp" />
      <img
        src={imgUrl(img.name, 'jpg')}
        width={img.w}
        height={img.h}
        alt={alt ?? img.alt}
        className={className}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}
