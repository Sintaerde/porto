import { useEffect, useRef } from 'react'
import { useFinePointer } from '../hooks/useFinePointer'

/** Latar aurora pastel + grain + cahaya lembut yang mengikuti kursor. */
export function Ambient() {
  const glow = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  useEffect(() => {
    const el = glow.current
    if (!el || !fine) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.opacity = '1'
        el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`
      })
    }
    addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', onMove)
    }
  }, [fine])
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
    </>
  )
}
