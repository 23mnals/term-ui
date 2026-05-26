import {
  createContext,
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react'
import {
  THEMES,
  DEFAULT_THEME,
  DEFAULT_CUSTOM_COLOR,
  STORAGE_KEY,
  STORAGE_KEY_CUSTOM,
  isValidTheme,
} from './themes.js'
import { generatePalette, PALETTE_VARS, isValidHex } from './colorUtils.js'

const ThemeContext = createContext(null)

function readStored(key, fallback, validate) {
  try {
    const v = localStorage.getItem(key)
    if (v && validate(v)) return v
  } catch {
    /* localStorage blocked — fall through */
  }
  return fallback
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() =>
    readStored(STORAGE_KEY, DEFAULT_THEME, isValidTheme),
  )
  const [customColor, setCustomColorState] = useState(() =>
    readStored(STORAGE_KEY_CUSTOM, DEFAULT_CUSTOM_COLOR, isValidHex),
  )

  /* apply before paint: data-theme attribute drives presets,
     inline CSS vars drive the computed custom palette */
  useLayoutEffect(() => {
    const el = document.documentElement
    el.setAttribute('data-theme', theme)

    // always clear stale inline custom vars first
    PALETTE_VARS.forEach((v) => el.style.removeProperty(v))

    if (theme === 'custom') {
      const palette = generatePalette(customColor)
      if (palette) {
        Object.entries(palette).forEach(([k, v]) => el.style.setProperty(k, v))
      }
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme)
      localStorage.setItem(STORAGE_KEY_CUSTOM, customColor)
    } catch {
      /* persistence is best-effort */
    }
  }, [theme, customColor])

  const setTheme = useCallback((id) => {
    if (isValidTheme(id)) setThemeState(id)
  }, [])

  const cycleTheme = useCallback(() => {
    const order = [...THEMES.map((t) => t.id), 'custom']
    setThemeState((cur) => order[(order.indexOf(cur) + 1) % order.length])
  }, [])

  /* pick a colour -> store it and jump to the custom theme */
  const setCustomColor = useCallback((hex) => {
    if (!isValidHex(hex)) return
    setCustomColorState(hex)
    setThemeState('custom')
  }, [])

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, cycleTheme, themes: THEMES, customColor, setCustomColor }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
