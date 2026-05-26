import { useState, useRef } from 'react'

/**
 * Tabs — vim-style window splits. Arrow keys move between tabs.
 * items: [{ id, label, content, disabled }]
 * Works controlled (value + onChange) or uncontrolled (defaultTab).
 */
export function Tabs({ items = [], defaultTab, value, onChange, className = '' }) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultTab ?? items[0]?.id)
  const active = isControlled ? value : internal
  const tabRefs = useRef({})

  const select = (id) => {
    const item = items.find((t) => t.id === id)
    if (!item || item.disabled) return
    if (!isControlled) setInternal(id)
    onChange?.(id)
  }

  const onKeyDown = (e) => {
    const enabled = items.filter((t) => !t.disabled)
    const idx = enabled.findIndex((t) => t.id === active)
    if (idx < 0) return
    let next
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
      next = enabled[(idx + 1) % enabled.length]
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      next = enabled[(idx - 1 + enabled.length) % enabled.length]
    else if (e.key === 'Home') next = enabled[0]
    else if (e.key === 'End') next = enabled[enabled.length - 1]
    if (next) {
      e.preventDefault()
      select(next.id)
      tabRefs.current[next.id]?.focus()
    }
  }

  const activeItem = items.find((t) => t.id === active)

  return (
    <div className={['tm-tabs', className].filter(Boolean).join(' ')}>
      <div className="tm-tabs__strip" role="tablist" onKeyDown={onKeyDown}>
        {items.map((t) => {
          const sel = t.id === active
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tm-tab-${t.id}`}
              aria-selected={sel}
              aria-controls={`tm-panel-${t.id}`}
              tabIndex={sel ? 0 : -1}
              disabled={t.disabled}
              ref={(el) => {
                tabRefs.current[t.id] = el
              }}
              className={['tm-tabs__tab', sel && 'is-active', t.disabled && 'is-disabled']
                .filter(Boolean)
                .join(' ')}
              onClick={() => select(t.id)}
            >
              {t.label}
            </button>
          )
        })}
        <span className="tm-tabs__fill" aria-hidden="true" />
      </div>
      <div
        className="tm-tabs__panel"
        role="tabpanel"
        id={`tm-panel-${active}`}
        aria-labelledby={`tm-tab-${active}`}
        tabIndex={0}
      >
        {activeItem?.content}
      </div>
    </div>
  )
}
