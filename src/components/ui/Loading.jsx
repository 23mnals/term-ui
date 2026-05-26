import { useState, useEffect, useRef } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Loading — a full-screen loading screen. Theme-aware (every colour
 * is a token, so it follows the active phosphor profile). A tight,
 * centred block: wordmark + ascii progress bar + status line.
 */
export function Loading({ title = 'TERM/UI', duration = 2800, onComplete }) {
  const [elapsed, setElapsed] = useState(0)
  const onDone = useRef(onComplete)
  onDone.current = onComplete
  const fired = useRef(false)

  useEffect(() => {
    if (prefersReduced()) {
      setElapsed(duration)
      const t = window.setTimeout(() => onDone.current?.(), 500)
      return () => window.clearTimeout(t)
    }
    let raf
    let start = null
    const loop = (ts) => {
      if (start === null) start = ts
      const e = ts - start
      setElapsed(e)
      if (e >= duration && !fired.current) {
        fired.current = true
        window.setTimeout(() => onDone.current?.(), 700)
      }
      if (e < duration + 900) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [duration])

  const progress = Math.min(100, (elapsed / duration) * 100)
  const done = elapsed >= duration
  const CELLS = 28
  const filled = Math.round((progress / 100) * CELLS)
  const titleParts = title.split('/')

  return (
    <div className="tm-loading" role="status" aria-live="polite" aria-label="Loading">
      <div className="tm-loading__beam" aria-hidden="true" />
      <div className="tm-loading__core">
        <p className="tm-loading__logo" aria-hidden="true">
          {titleParts.map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="tm-loading__slash">/</span>}
              {part}
            </span>
          ))}
        </p>

        <div className="tm-loading__bar" aria-hidden="true">
          <span className="tm-loading__br">[</span>
          <span className="tm-loading__on">{'█'.repeat(filled)}</span>
          <span className="tm-loading__off">{'░'.repeat(CELLS - filled)}</span>
          <span className="tm-loading__br">]</span>
          <span className="tm-loading__pct">{Math.round(progress)}%</span>
        </div>

        <p
          className={['tm-loading__status', done && 'is-done']
            .filter(Boolean)
            .join(' ')}
        >
          <span className="tm-loading__ar">&gt;</span>
          {done ? 'SYSTEM READY' : 'booting'}
          <span className="tm-cursor" />
        </p>
      </div>
    </div>
  )
}
