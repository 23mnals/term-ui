import { useState, useRef, useEffect, useId } from 'react'

/**
 * Select — a custom listbox dropdown (native <select> can't be themed
 * to the terminal grammar). Full keyboard support: type-ahead aside,
 * arrows move, Enter picks, Esc closes, click-outside closes.
 * options: [{ value, label, disabled }]
 */
export function Select({
  options = [],
  value,
  onChange,
  placeholder = 'select_option',
  disabled = false,
  label,
  id,
  className = '',
  ...rest
}) {
  const reactId = useId()
  const selId = id || `tm-sel-${reactId}`
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const btnRef = useRef(null)

  const selected = options.find((o) => o.value === value)
  const enabledIdxs = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0)

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  useEffect(() => {
    if (open && activeIdx >= 0 && listRef.current) {
      listRef.current.children[activeIdx]?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, activeIdx])

  const openList = () => {
    if (disabled) return
    setOpen(true)
    const cur = options.findIndex((o) => o.value === value)
    setActiveIdx(cur >= 0 ? cur : (enabledIdxs[0] ?? -1))
  }
  const close = (focusBtn = true) => {
    setOpen(false)
    if (focusBtn) btnRef.current?.focus()
  }
  const choose = (idx) => {
    const opt = options[idx]
    if (!opt || opt.disabled) return
    onChange?.(opt.value)
    close()
  }
  const move = (dir) => {
    setActiveIdx((cur) => {
      let i = cur
      for (let step = 0; step < options.length; step += 1) {
        i = (i + dir + options.length) % options.length
        if (!options[i].disabled) return i
      }
      return cur
    })
  }

  const onKeyDown = (e) => {
    if (disabled) return
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      move(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      move(-1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActiveIdx(enabledIdxs[0] ?? -1)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActiveIdx(enabledIdxs[enabledIdxs.length - 1] ?? -1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      choose(activeIdx)
    } else if (e.key === 'Tab') {
      close(false)
    }
  }

  return (
    <div
      ref={rootRef}
      className={['tm-field', disabled && 'is-disabled', className]
        .filter(Boolean)
        .join(' ')}
    >
      {label && (
        <span className="tm-field__label" id={`${selId}-label`}>
          {label}
        </span>
      )}
      <div
        className={['tm-select', open && 'is-open', disabled && 'is-disabled']
          .filter(Boolean)
          .join(' ')}
      >
        <button
          ref={btnRef}
          type="button"
          id={selId}
          className="tm-select__control"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${selId}-list`}
          aria-labelledby={label ? `${selId}-label` : undefined}
          disabled={disabled}
          onClick={() => (open ? close() : openList())}
          onKeyDown={onKeyDown}
          {...rest}
        >
          <span className="tm-select__prefix" aria-hidden="true">
            {selected ? '>' : '?'}
          </span>
          <span
            className={['tm-select__value', !selected && 'is-placeholder']
              .filter(Boolean)
              .join(' ')}
          >
            {selected ? selected.label : placeholder}
          </span>
          <span className="tm-select__caret" aria-hidden="true">
            {open ? '▴' : '▾'}
          </span>
        </button>

        {open && (
          <ul
            ref={listRef}
            id={`${selId}-list`}
            role="listbox"
            className="tm-select__list"
            aria-labelledby={label ? `${selId}-label` : undefined}
          >
            {options.map((o, i) => {
              const isSel = o.value === value
              const isActive = i === activeIdx
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={isSel}
                  aria-disabled={o.disabled || undefined}
                  className={[
                    'tm-select__opt',
                    isActive && 'is-active',
                    isSel && 'is-selected',
                    o.disabled && 'is-disabled',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => !o.disabled && setActiveIdx(i)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    choose(i)
                  }}
                >
                  <span className="tm-select__optmark" aria-hidden="true">
                    {isSel ? '>' : ' '}
                  </span>
                  <span className="tm-select__optlabel">{o.label}</span>
                  {o.disabled && (
                    <span className="tm-select__optflag" aria-hidden="true">
                      --locked
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
