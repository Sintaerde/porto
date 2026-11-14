import { AnimatePresence, m } from 'framer-motion'
import { useId, useState } from 'react'
import { skills } from '../data/content'
import { GradTitle } from './Heading'
import { Reveal } from './Reveal'

function place(items: string[]) {
  return items.map((t, i) => {
    const a = (i / items.length) * Math.PI * 2
    return { t, left: 50 + 50 * Math.cos(a) + '%', top: 50 + 50 * Math.sin(a) + '%' }
  })
}

/** Orbit skill yang berputar: cincin dalam & luar berlawanan arah. */
function Orbit() {
  return (
    <div className="orbit" role="img" aria-label={`Toolkit: ${[...skills.orbitInner, ...skills.orbitOuter].join(', ')}`}>
      <div className="ring r2" aria-hidden="true">
        {place(skills.orbitOuter).map((p) => (
          <span key={p.t} style={{ left: p.left, top: p.top }}>
            {p.t}
          </span>
        ))}
      </div>
      <div className="ring r1" aria-hidden="true">
        {place(skills.orbitInner).map((p) => (
          <span key={p.t} style={{ left: p.left, top: p.top }}>
            {p.t}
          </span>
        ))}
      </div>
      <div className="core" aria-hidden="true">
        <span>
          {skills.core[0]}
          <br />
          {skills.core[1]}
        </span>
      </div>
    </div>
  )
}

export function Skills() {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()
  return (
    <section id="skills" className="sec" aria-labelledby="skills-title">
      <Reveal>
        <span className="eyebrow">{skills.eyebrow}</span>
        <GradTitle parts={skills.title} id="skills-title" />
      </Reveal>
      <div className="skills-wrap">
        <Reveal>
          <Orbit />
        </Reveal>
        <Reveal delay={0.12} className="skill-groups">
          {skills.groups.map((g, i) => {
            const isOpen = open === i
            return (
              <div key={g.title} className={`sg${isOpen ? ' open' : ''}`}>
                <h3 style={{ margin: 0 }}>
                  <button type="button" aria-expanded={isOpen} aria-controls={`${uid}-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    <span className="ic" style={{ background: g.bg }} aria-hidden="true">
                      {g.icon}
                    </span>
                    {g.title}
                    <span className="pl" aria-hidden="true">
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`${uid}-${i}`}
                      role="region"
                      aria-label={g.title}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <ul className="content" style={{ listStyle: 'none', margin: 0 }}>
                        {g.items.map((c) => (
                          <li className="chip" key={c}>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
