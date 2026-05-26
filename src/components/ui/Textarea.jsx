import { useId } from 'react'

/**
 * Textarea — a multi-line shell buffer. Optional prompt tag,
 * focus highlight, error state.
 */
export function Textarea({
  label,
  value = '',
  onChange,
  placeholder = '',
  error = '',
  disabled = false,
  rows = 4,
  prompt,
  id,
  className = '',
  ...rest
}) {
  const reactId = useId()
  const taId = id || `tm-ta-${reactId}`
  const errId = `${taId}-err`

  return (
    <div className={['tm-field', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={taId} className="tm-field__label">
          {label}
        </label>
      )}

      <div
        className={['tm-textarea', error && 'is-error', disabled && 'is-disabled']
          .filter(Boolean)
          .join(' ')}
      >
        {prompt && (
          <span className="tm-textarea__prompt" aria-hidden="true">
            {prompt}
          </span>
        )}
        <textarea
          id={taId}
          className="tm-textarea__field"
          value={value}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          {...rest}
        />
      </div>

      {error && (
        <p id={errId} className="tm-field__error" role="alert">
          <span className="tm-field__errtag">[ERR]</span> {error}
        </p>
      )}
    </div>
  )
}
