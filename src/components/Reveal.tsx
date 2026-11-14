import { m } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  id?: string
  y?: number
}

/** Muncul perlahan saat masuk viewport (scroll-reveal). */
export function Reveal({ children, delay = 0, className, id, y = 40 }: Props) {
  return (
    <m.div
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </m.div>
  )
}
