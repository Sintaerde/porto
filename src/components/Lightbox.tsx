import { AnimatePresence, m } from 'framer-motion'
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Img } from '../data/content'
import { useDialog } from '../hooks/useDialog'
import { imgUrl } from './Picture'

interface LightboxItem {
  img: Img
  caption?: string
}

const Ctx = createContext<(item: LightboxItem) => void>(() => {})

/** Panggil `open({ img, caption })` dari komponen mana pun untuk membuka lightbox. */
export const useLightbox = () => useContext(Ctx)

function LightboxView({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useDialog(ref, onClose)
  return (
    <m.div
      ref={ref}
      className={`lightbox${item.img.h > item.img.w ? ' tall' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption ?? item.img.alt}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button type="button" className="x" aria-label="Tutup gambar" onClick={onClose}><span className="x-ic" aria-hidden="true" /></button>
      <m.picture initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
        <source srcSet={imgUrl(item.img.name, 'webp')} type="image/webp" />
        <img src={imgUrl(item.img.name, 'jpg')} width={item.img.w} height={item.img.h} alt={item.img.alt} />
      </m.picture>
      {item.caption && <p>{item.caption}</p>}
    </m.div>
  )
}

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null)
  const open = useCallback((i: LightboxItem) => setItem(i), [])
  const close = useCallback(() => setItem(null), [])
  const value = useMemo(() => open, [open])
  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>{item && <LightboxView key="lb" item={item} onClose={close} />}</AnimatePresence>
    </Ctx.Provider>
  )
}
