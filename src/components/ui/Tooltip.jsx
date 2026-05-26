/**
 * Tooltip — a hint popover. CSS-driven: shows on hover and on
 * keyboard focus of the wrapped element. No JS positioning, so
 * it never gets out of sync.
 * placement: top | bottom | left | right
 */
export function Tooltip({ content, placement = 'top', children, className = '' }) {
  return (
    <span
      className={['tm-tip', `tm-tip--${placement}`, className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="tm-tip__trigger">{children}</span>
      <span className="tm-tip__pop" role="tooltip">
        <span className="tm-tip__arrow" aria-hidden="true" />
        {content}
      </span>
    </span>
  )
}
