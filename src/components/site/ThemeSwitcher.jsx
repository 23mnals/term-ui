import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../theme/ThemeProvider.jsx'
import { QUICK_COLORS } from '../../theme/themes.js'
import { isValidHex } from '../../theme/colorUtils.js'

/**
 * ThemeSwitcher — the `--theme` flag.
 * 4 phosphor presets + a custom HEX picker (native colour input,
 * a hex field and quick-pick swatches). Picking any colour computes
 * a full palette and re-themes the whole system.
 */
export function ThemeSwitcher() {
  const { theme, setTheme, themes, customColor, setCustomColor, savedColors, saveColor, deleteSavedColor } = useTheme()
  const isAlreadySaved = savedColors.includes(customColor)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(customColor)
  const ref = useRef(null)

  // keep the hex field in sync when colour changes elsewhere
  useEffect(() => {
    setDraft(customColor)
  }, [customColor])

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isCustom = theme === 'custom'
  const current = themes.find((t) => t.id === theme)
  const currentSwatch = isCustom ? customColor : (current || themes[0]).swatch

  const onHexInput = (val) => {
    setDraft(val)
    if (isValidHex(val)) setCustomColor(val)
  }

  return (
    <div className="tm-theme" ref={ref}>
      <button
        type="button"
        className={['tm-theme__btn', open && 'is-open'].filter(Boolean).join(' ')}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span
          className="tm-theme__swatch"
          style={{ background: currentSwatch }}
          aria-hidden="true"
        />
        <span className="tm-theme__cmd">--theme</span>
        <span className="tm-theme__caret" aria-hidden="true">
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div className="tm-theme__menu" role="menu" aria-label="colour theme">
          <p className="tm-theme__head" aria-hidden="true">
            // PHOSPHOR PROFILE
          </p>
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              role="menuitemradio"
              aria-checked={t.id === theme}
              className={['tm-theme__opt', t.id === theme && 'is-active']
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                setTheme(t.id)
                setOpen(false)
              }}
            >
              <span
                className="tm-theme__swatch"
                style={{ background: t.swatch }}
                aria-hidden="true"
              />
              <span className="tm-theme__optname">{t.label}</span>
              <span className="tm-theme__optcmd">{t.cmd}</span>
              <span className="tm-theme__check" aria-hidden="true">
                {t.id === theme ? '[*]' : '[ ]'}
              </span>
            </button>
          ))}

          <p className="tm-theme__head" aria-hidden="true">
            // CUSTOM PHOSPHOR
          </p>
          <button
            type="button"
            role="menuitemradio"
            aria-checked={isCustom}
            className={['tm-theme__opt', isCustom && 'is-active']
              .filter(Boolean)
              .join(' ')}
            onClick={() => setTheme('custom')}
          >
            <span
              className="tm-theme__swatch"
              style={{ background: customColor }}
              aria-hidden="true"
            />
            <span className="tm-theme__optname">CUSTOM</span>
            <span className="tm-theme__optcmd">phosphor.hex</span>
            <span className="tm-theme__check" aria-hidden="true">
              {isCustom ? '[*]' : '[ ]'}
            </span>
          </button>

          <div className="tm-theme__picker">
            <input
              type="color"
              className="tm-theme__colorinput"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              aria-label="pick custom colour"
            />
            <input
              type="text"
              className={['tm-theme__hex', !isValidHex(draft) && 'is-bad']
                .filter(Boolean)
                .join(' ')}
              value={draft}
              onChange={(e) => onHexInput(e.target.value)}
              spellCheck={false}
              maxLength={7}
              aria-label="hex value"
            />
            <button
              type="button"
              className={['tm-theme__savebtn', isAlreadySaved && 'is-saved'].filter(Boolean).join(' ')}
              onClick={() => saveColor(customColor)}
              disabled={!isValidHex(customColor) || isAlreadySaved}
              aria-label={isAlreadySaved ? 'colour already saved' : 'save colour'}
            >
              {isAlreadySaved ? '[✓]' : '[+]'}
            </button>
          </div>
          <div className="tm-theme__quick" role="group" aria-label="quick colours">
            {QUICK_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                className="tm-theme__qbtn"
                style={{ background: c }}
                onClick={() => setCustomColor(c)}
                aria-label={`use ${c}`}
              />
            ))}
          </div>

          {savedColors.length > 0 && (
            <>
              <p className="tm-theme__head" aria-hidden="true">// SAVED</p>
              <div className="tm-theme__saved" role="group" aria-label="saved colours">
                {savedColors.map((c) => (
                  <span key={c} className="tm-theme__swrap">
                    <button
                      type="button"
                      className="tm-theme__qbtn"
                      style={{ background: c }}
                      onClick={() => setCustomColor(c)}
                      aria-label={`use ${c}`}
                    />
                    <button
                      type="button"
                      className="tm-theme__sdel"
                      onClick={(e) => { e.stopPropagation(); deleteSavedColor(c) }}
                      aria-label={`remove ${c}`}
                    >×</button>
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
