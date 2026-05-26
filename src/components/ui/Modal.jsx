import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Modal — a system window that boots into view (CRT scan-on effect).
 * Esc closes, focus is trapped inside, body scroll locks, and focus
 * is returned to the trigger on close.
 * tone: default | danger
 */
export function Modal({
  open,
  onClose,
  title = 'SYSTEM',
  children,
  footer = null,
  tone = 'default',
  closeOnBackdrop = true,
}) {
  const paneRef = useRef(null)
  const prevFocus = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    prevFocus.current = document.activeElement

    const trapFocus = (e) => {
      const pane = paneRef.current
      if (!pane) return
      const nodes = pane.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      const list = Array.from(nodes).filter((n) => !n.disabled)
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose?.()
      } else if (e.key === 'Tab') {
        trapFocus(e)
      }
    }

    document.addEventListener('keydown', onKey, true)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => paneRef.current?.focus(), 20)

    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = prevOverflow
      window.clearTimeout(t)
      if (prevFocus.current && prevFocus.current.focus) prevFocus.current.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="tm-modal"
      role="presentation"
      onMouseDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="tm-modal__scrim" aria-hidden="true" />
      <div
        ref={paneRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={['tm-modal__pane', `tm-modal__pane--${tone}`].filter(Boolean).join(' ')}
      >
        <header className="tm-modal__bar">
          <span className="tm-modal__title">
            <span aria-hidden="true">// </span>
            {title}
          </span>
          <button
            type="button"
            className="tm-modal__x"
            aria-label="Close dialog"
            onClick={onClose}
          >
            [ x ]
          </button>
        </header>
        <div className="tm-modal__body">{children}</div>
        {footer && <footer className="tm-modal__footer">{footer}</footer>}
      </div>
    </div>,
    document.body,
  )
}
