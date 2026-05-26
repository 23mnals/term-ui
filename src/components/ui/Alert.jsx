const ALERT_TAG = {
  info: '[ i ]',
  success: '[ ✓ ]',
  warning: '[ ! ]',
  error: '[ ✕ ]',
}

/**
 * Alert — an inline callout box with a status tag and accent rail.
 * tone: info | success | warning | error
 * Pass onClose to make it dismissible.
 */
export function Alert({
  children,
  tone = 'info',
  title,
  onClose,
  className = '',
  ...rest
}) {
  return (
    <div
      className={['tm-alert', `tm-alert--${tone}`, className]
        .filter(Boolean)
        .join(' ')}
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      {...rest}
    >
      <span className="tm-alert__tag" aria-hidden="true">
        {ALERT_TAG[tone] || ALERT_TAG.info}
      </span>
      <div className="tm-alert__content">
        {title && <p className="tm-alert__title">{title}</p>}
        {children && <div className="tm-alert__body">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          className="tm-alert__x"
          onClick={onClose}
          aria-label="Dismiss"
        >
          [ ✕ ]
        </button>
      )}
    </div>
  )
}
