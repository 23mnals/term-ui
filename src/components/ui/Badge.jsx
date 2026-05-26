/**
 * Badge — a status tag.
 * tone:    default | primary | secondary | error | muted
 * variant: outline (bracketed) | solid (filled block)
 */
export function Badge({
  children,
  tone = 'default',
  variant = 'outline',
  dot = false,
  className = '',
  ...rest
}) {
  return (
    <span
      className={['tm-badge', `tm-badge--${tone}`, `tm-badge--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {dot && (
        <span className="tm-badge__dot" aria-hidden="true">
          {'●'}
        </span>
      )}
      <span className="tm-badge__text">{children}</span>
    </span>
  )
}
