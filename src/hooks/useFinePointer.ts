import { useEffect, useState } from 'react'

function useMedia(query: string): boolean {
  const [match, setMatch] = useState(() => (typeof matchMedia === 'function' ? matchMedia(query).matches : false))
  useEffect(() => {
    const mq = matchMedia(query)
    const onChange = () => setMatch(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return match
}

/** true bila perangkat punya kursor presisi + hover (bukan layar sentuh). */
export const useFinePointer = () => useMedia('(hover: hover) and (pointer: fine)')

/** true bila pengguna meminta animasi dikurangi. */
export const usePrefersReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')

/** true bila lebar layar tergolong mobile. */
export const useIsMobile = () => useMedia('(max-width: 899px)')
