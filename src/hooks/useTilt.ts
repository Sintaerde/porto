import { useEffect, type RefObject } from 'react'
import { useFinePointer, usePrefersReducedMotion } from './useFinePointer'

/**
 * Efek miring 3D mengikuti kursor + posisi kilau (--mx/--my).
 * Otomatis nonaktif di perangkat sentuh dan saat prefers-reduced-motion.
 */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, max: number) {
  const fine = useFinePointer()
  const reduce = usePrefersReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || !fine || reduce) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width
        const y = (e.clientY - r.top) / r.height
        el.style.transform = `perspective(1100px) rotateY(${(x - 0.5) * max}deg) rotateX(${(0.5 - y) * max}deg) translateZ(0)`
        el.style.setProperty('--mx', x * 100 + '%')
        el.style.setProperty('--my', y * 100 + '%')
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.transform = ''
    }
  }, [ref, fine, reduce, max])
}
