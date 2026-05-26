import { useRef } from 'react'

/**
 * RadioGroup — ascii single-select.  ( ) empty   (•) chosen
 * Roving tabindex + arrow keys, ARIA radiogroup semantics.
 * options: [{ value, label, disabled }]
 */
export function RadioGroup({
  options = [],
  value,
  onChange,
  disabled = false,
  className = '',
  ...rest
}) {
  const refs = useRef({})
  const enabledVals = options.filter((o) => !o.disabled).map((o) => o.value)
  const focusVal = enabledVals.includes(value) ? value : enabledVals[0]

  const pick = (val) => {
    const opt = options.find((o) => o.value === val)
    if (disabled || !opt || opt.disabled) return
    onChange?.(val)
  }

  const onKeyDown = (e) => {
    if (disabled || enabledVals.length === 0) return
    const idx = Math.max(0, enabledVals.indexOf(value ?? focusVal))
    let next
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight')
      next = enabledVals[(idx + 1) % enabledVals.length]
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
      next = enabledVals[(idx - 1 + enabledVals.length) % enabledVals.length]
    if (next != null) {
      e.preventDefault()
      pick(next)
      refs.current[next]?.focus()
    }
  }

  return (
    <div
      role="radiogroup"
      className={['tm-radios', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {options.map((o) => {
        const checked = o.value === value
        const od = disabled || o.disabled
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={checked}
            disabled={od}
            tabIndex={o.value === focusVal && !od ? 0 : -1}
            ref={(el) => {
              refs.current[o.value] = el
            }}
            className={['tm-radio', checked && 'is-checked', od && 'is-disabled']
              .filter(Boolean)
              .join(' ')}
            onClick={() => pick(o.value)}
            onKeyDown={onKeyDown}
          >
            <span className="tm-radio__mark" aria-hidden="true">
              (<span className="tm-radio__dot">{checked ? '•' : ' '}</span>)
            </span>
            <span className="tm-radio__label">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}
