import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useFinePointer'

/** Angka yang menghitung naik saat terlihat. */
export function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = usePrefersReducedMotion()
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setV(to)
      return
    }
    const c = animate(0, to, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to, reduce])
  return (
    <>
      <span ref={ref} aria-hidden="true">
        {v.toLocaleString('id-ID')}
      </span>
      <span className="sr-only">{to.toLocaleString('id-ID')}</span>
    </>
  )
}
