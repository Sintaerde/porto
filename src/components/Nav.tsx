import { useEffect, useState } from 'react'
import { nav } from '../data/content'

/** Nav pill kaca melayang; link aktif menyala sesuai section yang terlihat. */
export function Nav() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = [...nav.links.map((l) => l.href.slice(1)), nav.cta.href.slice(1)]
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    const hero = document.getElementById('hero')
    if (hero) io.observe(hero)
    return () => io.disconnect()
  }, [])

  return (
    <nav className="nav" aria-label="Navigasi utama">
      <a href="#hero" className="logo" aria-label="Sinta Rama Dani — kembali ke atas">
        S
      </a>
      {nav.links.map((l) => (
        <a key={l.href} href={l.href} className={`link${active === l.href.slice(1) ? ' active' : ''}`} aria-current={active === l.href.slice(1) ? 'true' : undefined}>
          {l.label}
        </a>
      ))}
      <a href={nav.cta.href} className="link cta">
        {nav.cta.label}
      </a>
    </nav>
  )
}
