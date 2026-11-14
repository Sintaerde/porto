import { AnimatePresence, m } from 'framer-motion'

export function Toast({ show, text }: { show: boolean; text: string }) {
  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="toast"
          role="status"
          aria-live="polite"
          initial={{ x: '-50%', y: 120, opacity: 0 }}
          animate={{ x: '-50%', y: 0, opacity: 1 }}
          exit={{ x: '-50%', y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {text}
        </m.div>
      )}
    </AnimatePresence>
  )
}
