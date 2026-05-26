/**
 * Switch — a hardware power toggle. The block knob slides across the
 * track; the rail prints OFF / ON beside it.
 */
export function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  className = '',
  ...rest
}) {
  const toggle = () => {
    if (!disabled) onChange?.(!checked)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      className={[
        'tm-switch',
        `tm-switch--${size}`,
        checked && 'is-on',
        disabled && 'is-disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="tm-switch__track" aria-hidden="true">
        <span className="tm-switch__rail">{checked ? 'ON' : 'OFF'}</span>
        <span className="tm-switch__knob">{checked ? 'I' : 'O'}</span>
      </span>
      {label && <span className="tm-switch__label">{label}</span>}
    </button>
  )
}
