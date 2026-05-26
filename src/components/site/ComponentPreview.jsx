import { useState } from 'react'

/**
 * ComponentPreview — a window with PREVIEW / CODE tabs.
 * Renders the live demo, or the source with a copy button.
 */
export function ComponentPreview({
  title = 'preview',
  code = '',
  children,
  align = 'left',
  className = '',
}) {
  const [tab, setTab] = useState('preview')
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable — silently no-op */
    }
  }

  return (
    <div className={['tm-preview', className].filter(Boolean).join(' ')}>
      <div className="tm-preview__bar">
        <div className="tm-preview__tabs" role="tablist" aria-label={title}>
          {['preview', 'code'].map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={['tm-preview__tab', tab === id && 'is-active']
                .filter(Boolean)
                .join(' ')}
              onClick={() => setTab(id)}
            >
              {id}
            </button>
          ))}
        </div>
        <div className="tm-preview__meta">
          {tab === 'code' && code && (
            <button type="button" className="tm-preview__copy" onClick={copy}>
              {copied ? '[ copied ]' : '[ copy ]'}
            </button>
          )}
          <span className="tm-preview__sig" aria-hidden="true">
            {title}
          </span>
        </div>
      </div>

      {tab === 'preview' ? (
        <div className={`tm-preview__stage tm-preview__stage--${align}`}>{children}</div>
      ) : (
        <pre className="tm-preview__code">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
