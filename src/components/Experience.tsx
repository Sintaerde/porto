import { AnimatePresence, m } from 'framer-motion'
import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { experience, type TimelineItem } from '../data/content'
import { useTilt } from '../hooks/useTilt'
import { GradTitle, RichText } from './Heading'
import { Reveal } from './Reveal'

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const card = useRef<HTMLDivElement>(null)
  useTilt(card, 5)
  return (
    <m.li
      className="t-item"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ listStyle: 'none' }}
    >
      <span className="node" aria-hidden="true">
        {item.icon}
      </span>
      <div className="t-card" ref={card}>
        <div className="t-head">
          <h3>{item.title}</h3>
          <span className="when">{item.when}</span>
        </div>
        <p className="t-org">{item.org}</p>
        <ul>
          {item.points.map((p) => (
            <li key={p}>
              <RichText text={p} />
            </li>
          ))}
        </ul>
      </div>
    </m.li>
  )
}

export function Experience() {
  const [tab, setTab] = useState(experience.tabs[0].id)
  const uid = useId()
  const current = experience.tabs.find((t) => t.id === tab) ?? experience.tabs[0]

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = experience.tabs.findIndex((t) => t.id === tab)
    let n = i
    if (e.key === 'ArrowRight') n = (i + 1) % experience.tabs.length
    else if (e.key === 'ArrowLeft') n = (i - 1 + experience.tabs.length) % experience.tabs.length
    else return
    e.preventDefault()
    setTab(experience.tabs[n].id)
    document.getElementById(`${uid}-tab-${experience.tabs[n].id}`)?.focus()
  }

  return (
    <section id="experience" className="sec" aria-labelledby="exp-title">
      <Reveal>
        <span className="eyebrow">{experience.eyebrow}</span>
        <GradTitle parts={experience.title} id="exp-title" />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="tabs" role="tablist" aria-label="Jenis pengalaman" onKeyDown={onKey}>
          {experience.tabs.map((t) => (
            <button
              key={t.id}
              id={`${uid}-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              aria-controls={`${uid}-panel`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
            >
              {tab === t.id && <m.span layoutId="tab-pill" className="pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>
      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`}>
        <AnimatePresence mode="wait">
          <m.ul key={current.id} className="timeline" style={{ listStyle: 'none' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {current.items.map((item, i) => (
              <TimelineCard key={item.title} item={item} index={i} />
            ))}
          </m.ul>
        </AnimatePresence>
      </div>
    </section>
  )
}
