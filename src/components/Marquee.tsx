import { marquee } from '../data/content'

/** Pita teks miring yang berjalan; salinan kedua disembunyikan dari pembaca layar. */
export function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee" aria-label={marquee.join(', ')} role="group">
        <div className="marquee-track" aria-hidden="true">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
