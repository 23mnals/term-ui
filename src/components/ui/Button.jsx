import { useState, useEffect } from 'react'

/* ascii spinner — cycles a glyph while loading */
const FRAMES = ['|', '/', '─', '\\']
function useSpinner(active) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!active) return undefined
    const id = setInterval(() => setI((n) => (n + 1) % FRAMES.length), 90)
    return () => clearInterval(id)
  }, [active])
  return active ? FRAMES[i] : null
}

/**
 * Button — terminal command key.
 * variant: primary | default | dashed | ghost | link | hud
 * size:    sm | md | lg
 */
export function Button({
  children,
  variant = 'default',
  size = 'md',
  danger = false,
  loading = false,
  disabled = false,
  block = false,
  icon = null,
  type = 'button',
  className = '',
  ...rest
}) {
  const spin = useSpinner(loading)
  const isDisabled = disabled || loading
  const isHud = variant === 'hud'

  const classes = [
    'tm-btn',
    `tm-btn--${variant}`,
    `tm-btn--${size}`,
    danger && 'tm-btn--danger',
    block && 'tm-btn--block',
    loading && 'is-loading',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {/* hud variant: inner frame span provides 2 extra pseudo-elements for 4 corner brackets */}
      {isHud && <span className="tm-btn__frame" aria-hidden="true" />}
      {loading ? (
        <span className="tm-btn__glyph" aria-hidden="true">
          {spin}
        </span>
      ) : icon ? (
        <span className="tm-btn__glyph" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="tm-btn__label">{children}</span>
    </button>
  )
}
