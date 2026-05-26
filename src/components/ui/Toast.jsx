import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Toast — system notifications.
 * Wrap the app in <ToastProvider>, then call useToast().push(...)
 * from anywhere. Toasts slide in, auto-dismiss, and stack.
 */
const ToastContext = createContext(null)
let seq = 0

const TOAST_TAG = {
  info: '[ i ]',
  success: '[ ✓ ]',
  warning: '[ ! ]',
  error: '[ ✕ ]',
}

function ToastCard({ toast, onDismiss }) {
  return (
    <div className={`tm-toast tm-toast--${toast.tone}`} role="status">
      <span className="tm-toast__tag" aria-hidden="true">
        {TOAST_TAG[toast.tone] || TOAST_TAG.info}
      </span>
      <div className="tm-toast__body">
        {toast.title && <p className="tm-toast__title">{toast.title}</p>}
        {toast.message && <p className="tm-toast__msg">{toast.message}</p>}
      </div>
      <button
        type="button"
        className="tm-toast__x"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
      >
        [ ✕ ]
      </button>
    </div>
  )
}

export function ToastProvider({ children, max = 4 }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
    if (timers.current[id]) {
      clearTimeout(timers.current[id])
      delete timers.current[id]
    }
  }, [])

  const push = useCallback(
    (opts) => {
      seq += 1
      const id = seq
      const base = typeof opts === 'string' ? { message: opts } : opts || {}
      const toast = { id, tone: 'info', title: '', message: '', duration: 4200, ...base }
      setToasts((list) => {
        const next = [...list, toast]
        return next.length > max ? next.slice(next.length - max) : next
      })
      if (toast.duration > 0) {
        timers.current[id] = setTimeout(() => dismiss(id), toast.duration)
      }
      return id
    },
    [dismiss, max],
  )

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className="tm-toast-vp">
            {toasts.map((t) => (
              <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
