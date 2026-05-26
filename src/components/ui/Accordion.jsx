import { useState } from 'react'

/**
 * Accordion — collapsible panels.  ▸ closed   ▾ open
 * items: [{ id, label, content }]
 * multiple: allow more than one panel open at once.
 */
export function Accordion({
  items = [],
  multiple = false,
  defaultOpen = [],
  className = '',
}) {
  const [open, setOpen] = useState(
    () => new Set([].concat(defaultOpen).filter((v) => v != null)),
  )

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : [])
      if (prev.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className={['tm-acc', className].filter(Boolean).join(' ')}>
      {items.map((it) => {
        const isOpen = open.has(it.id)
        return (
          <div
            key={it.id}
            className={['tm-acc__item', isOpen && 'is-open']
              .filter(Boolean)
              .join(' ')}
          >
            <button
              type="button"
              className="tm-acc__head"
              aria-expanded={isOpen}
              onClick={() => toggle(it.id)}
            >
              <span className="tm-acc__caret" aria-hidden="true">
                {isOpen ? '▾' : '▸'}
              </span>
              <span className="tm-acc__label">{it.label}</span>
              <span className="tm-acc__sign" aria-hidden="true">
                {isOpen ? '[ - ]' : '[ + ]'}
              </span>
            </button>
            {isOpen && <div className="tm-acc__panel">{it.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
