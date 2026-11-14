import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex="-1"])'

/** Tumpukan dialog terbuka; hanya yang paling atas yang merespons Esc / Tab. */
const stack: symbol[] = []

/**
 * Perilaku dialog yang aksesibel: tutup dengan Esc, fokus terjebak (focus trap)
 * di dalam dialog, kunci scroll body, dan fokus dikembalikan ke pemicu saat ditutup.
 */
export function useDialog(ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const id = Symbol('dialog')
    stack.push(id)
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () => [...root.querySelectorAll<HTMLElement>(FOCUSABLE)]
    const first = focusables()[0]
    if (first) first.focus()
    else {
      root.tabIndex = -1
      root.focus()
    }

    const onKey = (e: KeyboardEvent) => {
      if (stack[stack.length - 1] !== id) return
      if (e.key === 'Escape') {
        e.stopPropagation()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) {
        e.preventDefault()
        return
      }
      const a = items[0]
      const z = items[items.length - 1]
      const active = document.activeElement
      if (!root.contains(active)) {
        e.preventDefault()
        a.focus()
      } else if (e.shiftKey && active === a) {
        e.preventDefault()
        z.focus()
      } else if (!e.shiftKey && active === z) {
        e.preventDefault()
        a.focus()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      const i = stack.indexOf(id)
      if (i >= 0) stack.splice(i, 1)
      if (!stack.length) document.body.style.overflow = prevOverflow
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true })
    }
  }, [ref])
}
