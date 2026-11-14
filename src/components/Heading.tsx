import type { ElementType } from 'react'

interface Props {
  parts: readonly [string, string, string]
  as?: ElementType
  className?: string
  id?: string
}

/** Judul dengan kata kunci italic bergradasi rose → ungu (bagian tengah). */
export function GradTitle({ parts, as: Tag = 'h2', className = 'h2', id }: Props) {
  return (
    <Tag className={className} id={id}>
      {parts[0]}
      <em className="grad-em">{parts[1]}</em>
      {parts[2]}
    </Tag>
  )
}

/** Merender **tebal** dan _miring_ sederhana dari data teks. */
export function RichText({ text }: { text: string }) {
  const nodes = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).filter(Boolean)
  return (
    <>
      {nodes.map((n, i) =>
        n.startsWith('**') ? <b key={i}>{n.slice(2, -2)}</b> : n.startsWith('_') && n.endsWith('_') ? <i key={i}>{n.slice(1, -1)}</i> : n,
      )}
    </>
  )
}
