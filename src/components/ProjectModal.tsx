import { m } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/content'
import { useDialog } from '../hooks/useDialog'
import { useLightbox } from './Lightbox'
import { Picture } from './Picture'

/** Video YouTube dimuat hanya setelah diklik (thumbnail + tombol play). */
function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [on, setOn] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    if (on) frame.current?.focus()
  }, [on])
  return (
    <div className="yt">
      {on ? (
        <iframe
          ref={frame}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button type="button" className="yt-thumb" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }} onClick={() => setOn(true)} aria-label={`Putar video: ${title}`}>
          <span className="yt-play">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#cf4f7c" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const openLightbox = useLightbox()
  useDialog(ref, onClose)
  const d = project.modal
  const titleId = `modal-title-${project.id}`

  return (
    <m.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <m.div
        ref={ref}
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: 30, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <button type="button" className="x" onClick={onClose} aria-label="Tutup detail proyek"><span className="x-ic" aria-hidden="true" /></button>
        <span className="eyebrow">{d.kicker}</span>
        <h3 id={titleId}>{d.title}</h3>
        <p>{d.description}</p>
        <ul>
          {d.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {d.meta && <p className="meta">{d.meta}</p>}
        {d.youtubeId && <YouTubeLite id={d.youtubeId} title={d.title} />}
        {d.gallery && (
          <div className="gallery" role="list" aria-label="Galeri gambar proyek">
            {d.gallery.map((g) => (
              <figure key={g.img.name} className={g.tall ? 'tall' : ''} role="listitem">
                <button type="button" className="gbtn" onClick={() => openLightbox({ img: g.img, caption: g.caption })} aria-label={`Perbesar gambar: ${g.caption}`}>
                  <Picture img={g.img} />
                  <figcaption>{g.caption}</figcaption>
                </button>
              </figure>
            ))}
          </div>
        )}
        {d.link && (
          <a className="btn btn-primary" href={d.link.href} target="_blank" rel="noopener noreferrer">
            {d.link.label} ↗<span className="sr-only"> (tab baru)</span>
          </a>
        )}
      </m.div>
    </m.div>
  )
}
