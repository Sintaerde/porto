import { lazy, Suspense, useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { profile } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/useFinePointer'

const HeroScene = lazy(() => import('./HeroScene'))

/** Efek mengetik bergantian untuk daftar peran. */
function Typed({ words }: { words: string[] }) {
  const reduce = usePrefersReducedMotion()
  const [text, setText] = useState(words[0])
  useEffect(() => {
    if (reduce) return
    let w = 0
    let i = words[0].length
    let del = true
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = words[w]
      i += del ? -1 : 1
      setText(word.slice(0, i))
      let d = del ? 45 : 85
      if (!del && i === word.length) {
        del = true
        d = 1800
      } else if (del && i === 0) {
        del = false
        w = (w + 1) % words.length
        d = 300
      }
      timer = setTimeout(tick, d)
    }
    timer = setTimeout(tick, 2000)
    return () => clearTimeout(timer)
  }, [words, reduce])
  return (
    <span className="typed">
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{words.join(', ')}</span>
    </span>
  )
}

const word = (delay: number) => ({
  initial: { opacity: 0, y: 40, rotateX: -40 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  transition: { duration: 1, delay, ease: [0.2, 0.7, 0.2, 1] as const },
})

export function Hero() {
  // Scene 3D dimuat setelah halaman idle agar LCP & interaktivitas awal tetap cepat.
  const [sceneReady, setSceneReady] = useState(false)
  useEffect(() => {
    let done = false
    const go = () => {
      if (done) return
      done = true
      cleanup()
      setSceneReady(true)
    }
    const events = ['pointermove', 'pointerdown', 'scroll', 'keydown', 'touchstart'] as const
    const cleanup = () => {
      events.forEach((e) => removeEventListener(e, go))
      clearTimeout(timer)
    }
    events.forEach((e) => addEventListener(e, go, { passive: true, once: true }))
    const timer = setTimeout(go, 8000)
    return cleanup
  }, [])

  const [l1, l2] = profile.nameLines
  return (
    <section id="hero" className="sec hero" aria-labelledby="hero-title">
      <div className="scene">
        <div className="scene-fallback" aria-hidden="true" />
        {sceneReady && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <div className="hero-text">
        <span className="badge">
          <b>{profile.badge.status}</b> {profile.badge.text}
        </span>
        <h1 id="hero-title">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true">
            {l1.map((w, i) => (
              <span key={w}>
                <m.span className="word" {...word(0.1 + i * 0.12)}>
                  {i === 0 ? <span className="grad">{w}</span> : w}
                </m.span>{' '}
              </span>
            ))}
            <span className="l2">
              {l2.map((w) => (
                <m.span key={w} className="word" {...word(0.36)}>
                  {w}
                </m.span>
              ))}
            </span>
          </span>
        </h1>
        <p className="roles">
          {profile.intro.prefix} <strong>{profile.intro.strong}</strong> {profile.intro.suffix} <Typed words={profile.roles} />
        </p>
        <div className="hero-actions">
          <a href={profile.actions.primary.href} className="btn btn-primary">
            {profile.actions.primary.label}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href={profile.actions.ghost.href} className="btn btn-ghost">
            {profile.actions.ghost.label}
          </a>
        </div>
      </div>

      <div className="hero-side">
        {profile.chips.map((c, i) => (
          <div key={c.small} className={`float-chip c${i + 1}`}>
            <small>{c.small}</small>
            <span>{c.value}</span>
          </div>
        ))}
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <i /> {profile.scrollHint}
      </div>
    </section>
  )
}
