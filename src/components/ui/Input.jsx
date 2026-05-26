import { useState, useId } from 'react'

/**
 * Input — a shell prompt field. No box: a prompt string, the field,
 * and a blinking block cursor that sits at the prompt while the field
 * is focused and empty — the way a real terminal waits for input.
 */
export function Input({
  label,
  prompt = 'user@term:~$',
  value = '',
  onChange,
  placeholder = '',
  error = '',
  disabled = false,
  type = 'text',
  id,
  className = '',
  ...rest
}) {
  const reactId = useId()
  const inputId = id || `tm-in-${reactId}`
  const errId = `${inputId}-err`
  const [focused, setFocused] = useState(false)

  const hasValue = value != null && String(value).length > 0
  const showBlock = focused && !disabled && !hasValue

  return (
    <div className={['tm-field', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={inputId} className="tm-field__label">
          {label}
        </label>
      )}

      <div
        className={[
          'tm-input',
          focused && 'is-focused',
          error && 'is-error',
          disabled && 'is-disabled',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="tm-input__prompt" aria-hidden="true">
          {prompt}
        </span>
        <span className="tm-input__wrap">
          {showBlock && <span className="tm-cursor" aria-hidden="true" />}
          <input
            id={inputId}
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            className={['tm-input__field', showBlock && 'is-blockcursor']
              .filter(Boolean)
              .join(' ')}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errId : undefined}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...rest}
          />
        </span>
      </div>

      {error && (
        <p id={errId} className="tm-field__error" role="alert">
          <span className="tm-field__errtag">[ERR]</span> {error}
        </p>
      )}
    </div>
  )
}
