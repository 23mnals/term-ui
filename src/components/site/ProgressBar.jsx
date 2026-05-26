/**
 * ProgressBar — raw ascii data viz: [████████········]
 * tone: primary | secondary | error
 */
export function ProgressBar({
  value = 0,
  label,
  cells = 26,
  tone = 'primary',
  showPct = true,
  className = '',
}) {
  const v = Math.max(0, Math.min(100, Math.round(value)))
  const filled = Math.round((v / 100) * cells)

  return (
    <div className={['tm-bar', `tm-bar--${tone}`, className].filter(Boolean).join(' ')}>
      {(label || showPct) && (
        <div className="tm-bar__head">
          <span className="tm-bar__label">{label}</span>
          {showPct && <span className="tm-bar__pct">{v}%</span>}
        </div>
      )}
      <div
        className="tm-bar__track"
        role="progressbar"
        aria-valuenow={v}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'progress'}
      >
        <span className="tm-bar__br" aria-hidden="true">
          [
        </span>
        <span className="tm-bar__on" aria-hidden="true">
          {'█'.repeat(filled)}
        </span>
        <span className="tm-bar__off" aria-hidden="true">
          {'·'.repeat(cells - filled)}
        </span>
        <span className="tm-bar__br" aria-hidden="true">
          ]
        </span>
      </div>
    </div>
  )
}
