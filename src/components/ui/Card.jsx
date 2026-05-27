/**
 * Card — a terminal window / tmux pane.
 * variant: legend (label notched into the top border) | solid (inverted bar) | hud (sci-fi frame)
 * status:  OK | ERR | WARN  — renders a status badge top-right
 */
const STATUS_TONE = { OK: 'ok', ERR: 'err', WARN: 'warn' }

export function Card({
  children,
  title,
  status = null,
  variant = 'legend',
  footer = null,
  className = '',
  ...rest
}) {
  const classes = ['tm-card', `tm-card--${variant}`, className].filter(Boolean).join(' ')
  const isHud = variant === 'hud'

  return (
    <section className={classes} {...rest}>
      {/* hud variant: chamfered inner border + 4 corner stripe strips + top/bottom arrows via CSS */}
      {isHud && (
        <>
          <span className="tm-card__hud-inner" aria-hidden="true" />
          <span className="tm-card__hc tm-card__hc--tl" aria-hidden="true" />
          <span className="tm-card__hc tm-card__hc--tr" aria-hidden="true" />
          <span className="tm-card__hc tm-card__hc--bl" aria-hidden="true" />
          <span className="tm-card__hc tm-card__hc--br" aria-hidden="true" />
        </>
      )}
      {title && (
        <header className="tm-card__bar">
          <span className="tm-card__title">
            {variant === 'solid' || variant === 'hud' ? null : <span className="tm-card__rule" aria-hidden="true" />}
            <span className="tm-card__name">{title}</span>
          </span>
          {status && (
            <span
              className={`tm-card__status tm-card__status--${STATUS_TONE[status] || 'ok'}`}
            >
              [{status}]
            </span>
          )}
        </header>
      )}
      <div className="tm-card__body">{children}</div>
      {footer && <footer className="tm-card__footer">{footer}</footer>}
    </section>
  )
}
