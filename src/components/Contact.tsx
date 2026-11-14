import { useEffect, useRef, useState } from 'react'
import { contact, img } from '../data/content'
import { GradTitle } from './Heading'
import { CopyIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from './icons'
import { Picture } from './Picture'
import { Reveal } from './Reveal'
import { Toast } from './Toast'

const icons = { email: MailIcon, whatsapp: WhatsAppIcon, linkedin: LinkedInIcon }

export function Contact() {
  const [toast, setToast] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async (text: string) => {
    let msg: string = contact.toast
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      msg = text // clipboard tidak tersedia: tampilkan teksnya agar bisa disalin manual
    }
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 1800)
  }

  return (
    <section id="contact" className="sec" aria-labelledby="contact-title">
      <Reveal className="contact">
        <span className="bubble" style={{ width: 120, height: 120, top: -30, left: '6%' }} aria-hidden="true" />
        <span className="bubble" style={{ width: 70, height: 70, bottom: 30, right: '8%', animationDelay: '-3s' }} aria-hidden="true" />
        <span className="bubble" style={{ width: 40, height: 40, top: '40%', right: '20%', animationDelay: '-5s' }} aria-hidden="true" />
        <div className="avatar">
          <Picture img={img.cafe} />
        </div>
        <span className="eyebrow">{contact.eyebrow}</span>
        <GradTitle parts={contact.title} id="contact-title" />
        <p className="lead">{contact.lead}</p>
        <ul className="c-list">
          {contact.items.map((c) => {
            const Icon = icons[c.kind]
            return (
              <li className={'c-item ' + c.kind} key={c.kind}>
                <a href={c.href} aria-label={c.label} title={c.label} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Icon />
                </a>
                <button type="button" className="c-copy" onClick={() => copy(c.copy)} aria-label={contact.copyLabel + ': ' + c.label} title={contact.copyLabel}>
                  <CopyIcon width={16} height={16} />
                </button>
              </li>
            )
          })}
        </ul>
      </Reveal>
      <Toast show={toast !== null} text={toast ?? ''} />
    </section>
  )
}
