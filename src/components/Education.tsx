import { m } from 'framer-motion'
import { education } from '../data/content'
import { GradTitle } from './Heading'
import { useLightbox } from './Lightbox'
import { Reveal } from './Reveal'

export function Education() {
  const openLightbox = useLightbox()
  const { card } = education
  return (
    <section id="education" className="sec" aria-labelledby="edu-title">
      <Reveal>
        <span className="eyebrow">{education.eyebrow}</span>
        <GradTitle parts={education.title} id="edu-title" />
      </Reveal>
      <div className="edu-grid">
        <Reveal>
          <div className="edu-card">
            <span className="cum">{card.badge}</span>
            <h3>{card.school}</h3>
            <p style={{ opacity: 0.85 }}>{card.program}</p>
            <div className="gpa">
              <b>{card.gpaText}</b>
              <small>{card.gpaMax}</small>
            </div>
            <div className="gpa-bar" role="progressbar" aria-label="IPK" aria-valuemin={0} aria-valuemax={4} aria-valuenow={card.gpa} aria-valuetext={`${card.gpaText} dari 4,00`}>
              <m.i
                initial={{ width: 0 }}
                whileInView={{ width: `${(card.gpa / 4) * 100}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.8, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
              />
            </div>
            <p className="thesis">
              {card.thesisLabel}
              <em>{card.thesis}</em>
            </p>
          </div>
        </Reveal>
        <ul className="certs" style={{ listStyle: 'none' }}>
          {education.certs.map((c, i) => {
            const body = (
              <>
                <span className="medal" aria-hidden="true">
                  {c.icon}
                </span>
                <div>
                  <h4>{c.title}</h4>
                  <p>{c.detail}</p>
                </div>
              </>
            )
            return (
              <li key={c.title}>
                <Reveal delay={0.08 * (i + 1)}>
                  {c.lightbox ? (
                    <button type="button" className="cert" aria-label={`${c.title}. Lihat gambar sertifikat`} onClick={() => openLightbox({ img: c.lightbox!.img, caption: c.lightbox!.caption })}>
                      {body}
                      <span className="see" aria-hidden="true">
                        Lihat ↗
                      </span>
                    </button>
                  ) : (
                    <div className="cert">{body}</div>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
