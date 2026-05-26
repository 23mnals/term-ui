import { useState, useEffect } from 'react'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Typewriter — prints text character by character.
 * Honours prefers-reduced-motion by rendering instantly.
 */
export function Typewriter({
  text = '',
  speed = 42,
  startDelay = 180,
  showCursor = true,
  onDone,
  className = '',
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (prefersReduced()) {
      setCount(text.length)
      onDone?.()
      return undefined
    }
    setCount(0)
    let i = 0
    let tick
    const startId = setTimeout(function step() {
      i += 1
      setCount(i)
      if (i < text.length) {
        tick = setTimeout(step, speed)
      } else {
        onDone?.()
      }
    }, startDelay)
    return () => {
      clearTimeout(startId)
      clearTimeout(tick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay])

  const done = count >= text.length

  return (
    <span className={className}>
      {text.slice(0, count)}
      {showCursor && (
        <span
          className={['tm-cursor', !done && 'tm-cursor--solid'].filter(Boolean).join(' ')}
        />
      )}
    </span>
  )
}
