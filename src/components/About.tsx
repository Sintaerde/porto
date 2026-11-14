import { useRef } from 'react'
import { about, img } from '../data/content'
import { useTilt } from '../hooks/useTilt'
import { Counter } from './Counter'
import { GradTitle } from './Heading'
import { Picture } from './Picture'
import { Reveal } from './Reveal'

export function About() {
  const portrait = useRef<HTMLDivElement>(null)
  useTilt(portrait, 18)
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="about-grid">
        <Reveal>
          <span className="eyebrow">{about.eyebrow}</span>
          <GradTitle parts={about.title} id="about-title" />
          <p className="lead">{about.lead}</p>
          <div className="stats">
            {about.stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="num">
                  <Counter to={s.value} />
                  {s.plus && <sup>+</sup>}
                </div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12} className="portrait-wrap">
          <div className="portrait" ref={portrait}>
            <div className="layer l-back" />
            <div className="layer l-mid">
              <Picture img={img.wisuda} />
            </div>
            <div className="tag t1">
              <span className="dot" style={{ background: about.tags[0].bg }} aria-hidden="true">
                {about.tags[0].icon}
              </span>
              {about.tags[0].text}
            </div>
            <div className="tag t2">
              <span className="dot" style={{ background: about.tags[1].bg }} aria-hidden="true">
                {about.tags[1].icon}
              </span>
              {about.tags[1].text}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
