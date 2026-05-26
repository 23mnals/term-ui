/**
 * Checkbox — ascii toggle box.
 *   [ ] unchecked   [X] checked   [-] indeterminate
 * Whole control is one button so a click anywhere toggles once.
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  className = '',
  ...rest
}) {
  const ariaChecked = indeterminate ? 'mixed' : checked
  const glyph = indeterminate ? '-' : checked ? 'X' : ' '

  const toggle = () => {
    if (!disabled) onChange?.(!checked)
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={ariaChecked}
      disabled={disabled}
      onClick={toggle}
      className={[
        'tm-check',
        (checked || indeterminate) && 'is-on',
        disabled && 'is-disabled',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="tm-check__box" aria-hidden="true">
        <span className="tm-check__br">[</span>
        <span className="tm-check__mark">{glyph}</span>
        <span className="tm-check__br">]</span>
      </span>
      {label && <span className="tm-check__label">{label}</span>}
    </button>
  )
}
