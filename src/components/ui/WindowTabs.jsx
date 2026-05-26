import { useState } from 'react'

let wtSeq = 0

/**
 * WindowTabs — a terminal window tab strip. Tabs can be closed (✕)
 * and new ones opened (+). Arrow keys switch, Delete closes.
 * defaultTabs: [{ id, label, content }]
 */
export function WindowTabs({
  defaultTabs = [],
  allowNew = true,
  onNewTab,
  className = '',
}) {
  const [tabs, setTabs] = useState(defaultTabs)
  const [active, setActive] = useState(defaultTabs[0]?.id ?? null)

  const close = (id, e) => {
    if (e) e.stopPropagation()
    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === id)
      const next = prev.filter((t) => t.id !== id)
      if (id === active) {
        const fallback = next[idx] || next[idx - 1] || next[0] || null
        setActive(fallback ? fallback.id : null)
      }
      return next
    })
  }

  const add = () => {
    wtSeq += 1
    const tab =
      onNewTab?.() || {
        id: `wt-${wtSeq}`,
        label: `untitled-${wtSeq}`,
        content: (
          <p className="tm-wtabs__placeholder">
            <span className="tm-prompt">$</span> new buffer — empty
            <span className="tm-cursor" />
          </p>
        ),
      }
    setTabs((prev) => [...prev, tab])
    setActive(tab.id)
  }

  const onKeyDown = (e) => {
    if (!tabs.length) return
    const idx = tabs.findIndex((t) => t.id === active)
    if (idx < 0) return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setActive(tabs[(idx + 1) % tabs.length].id)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setActive(tabs[(idx - 1 + tabs.length) % tabs.length].id)
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault()
      close(active)
    }
  }

  const current = tabs.find((t) => t.id === active)

  return (
    <div className={['tm-wtabs', className].filter(Boolean).join(' ')}>
      <div className="tm-wtabs__strip" role="tablist" onKeyDown={onKeyDown}>
        {tabs.map((t) => {
          const sel = t.id === active
          return (
            <div
              key={t.id}
              role="tab"
              aria-selected={sel}
              tabIndex={sel ? 0 : -1}
              className={['tm-wtabs__tab', sel && 'is-active']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActive(t.id)}
            >
              <span className="tm-wtabs__dot" aria-hidden="true">
                {sel ? '▸' : '·'}
              </span>
              <span className="tm-wtabs__label">{t.label}</span>
              <span
                role="button"
                tabIndex={-1}
                className="tm-wtabs__x"
                aria-label={`close ${t.label}`}
                onClick={(e) => close(t.id, e)}
              >
                ✕
              </span>
            </div>
          )
        })}
        {allowNew && (
          <button
            type="button"
            className="tm-wtabs__add"
            aria-label="new tab"
            onClick={add}
          >
            +
          </button>
        )}
      </div>
      <div className="tm-wtabs__body" role="tabpanel">
        {current ? (
          current.content
        ) : (
          <p className="tm-wtabs__placeholder">
            <span className="tm-prompt">$</span> no open buffers — press [ + ]
          </p>
        )}
      </div>
    </div>
  )
}
