import { AnimatePresence } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import { img, projects, youtube, type Project } from '../data/content'
import { useTilt } from '../hooks/useTilt'
import { GradTitle } from './Heading'
import { Picture } from './Picture'
import { ProjectModal } from './ProjectModal'
import { Reveal } from './Reveal'

/** Ilustrasi (mockup) kartu untuk tiap proyek, memakai gambar asli. */
const mocks: Record<Project['id'], ReactNode> = {
  arsip: (
    <div className="mock m-arsip">
      <span className="hki-badge">🏅 Bersertifikat HKI</span>
      <div className="browser">
        <div className="bar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <Picture img={img.arsipDashboard} alt="Dashboard Arsipin" />
      </div>
    </div>
  ),
  kasir: (
    <div className="mock m-kasir">
      <div className="web-behind">
        <Picture img={img.saladMenu} alt="Website Salad Mertua" />
      </div>
      <div className="phone-real">
        <Picture img={img.saladMobile} alt="Tampilan beranda aplikasi Salad Mertua" />
      </div>
      <span className="fchip" style={{ top: '10%', right: '20%', transform: 'rotate(6deg)' }}>
        🎨 Didesain di Figma
      </span>
      <span className="fchip" style={{ bottom: '22%', right: '8%', transform: 'rotate(5deg)' }}>
        ⛅ Info cuaca live
      </span>
    </div>
  ),
  riset: (
    <div className="mock m-riset">
      <span className="sinta2">SINTA 2 ✦</span>
      <div className="paper">
        <Picture img={img.jurnal} alt="Halaman pertama artikel jurnal JINITA" />
      </div>
    </div>
  ),
  kku: (
    <div className="mock m-video">
      <img
        className="yt-cover"
        src={`https://i.ytimg.com/vi/${youtube.id}/maxresdefault.jpg`}
        alt="Thumbnail video after movie KKU 2025"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const el = e.currentTarget
          const fallback = `https://i.ytimg.com/vi/${youtube.id}/hqdefault.jpg`
          if (el.src !== fallback) el.src = fallback
        }}
      />
      <a className="play" href={youtube.url} target="_blank" rel="noopener noreferrer" aria-label="Tonton after movie KKU 2025 di YouTube (tab baru)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#cf4f7c" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </a>
      <div className="socials" aria-hidden="true">
        <span>Instagram</span>
        <span>TikTok</span>
        <span>YouTube</span>
      </div>
    </div>
  ),
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const inner = useRef<HTMLDivElement>(null)
  useTilt(inner, 14)
  return (
    <div className={`proj ${project.size}`}>
      <Reveal className="h-full">
        <div className="proj-inner" ref={inner}>
          <span className="shine" aria-hidden="true" />
          <span className="open-ic" aria-hidden="true">
            ↗
          </span>
          {mocks[project.id]}
          <div className="proj-body">
            <span className="kicker">{project.kicker}</span>
            <h3>
              <button type="button" className="proj-open" onClick={() => onOpen(project)} aria-haspopup="dialog">
                {project.title}
              </button>
            </h3>
            <p>{project.summary}</p>
            <ul className="chips" aria-label="Teknologi dan topik" style={{ listStyle: 'none' }}>
              {project.chips.map((c) => (
                <li className="chip" key={c}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  return (
    <section id="projects" className="sec" aria-labelledby="proj-title">
      <Reveal>
        <span className="eyebrow">{projects.eyebrow}</span>
        <GradTitle parts={projects.title} id="proj-title" />
        <p className="lead">{projects.lead}</p>
      </Reveal>
      <div className="proj-grid">
        {projects.items.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setSelected} />
        ))}
      </div>
      <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}
