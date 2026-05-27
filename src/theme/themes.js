/* ============================================================
   TERM/UI :: THEME REGISTRY
   The 4 preset colours live in tokens.css under [data-theme].
   The 5th "custom" theme is computed at runtime from one hex
   (see colorUtils.js + ThemeProvider.jsx).
   ============================================================ */

export const THEMES = [
  {
    id: 'green',
    label: 'GREEN',
    code: 'P1',
    cmd: 'phosphor.green',
    swatch: '#33ff00',
    note: 'classic terminal green',
  },
  {
    id: 'amber',
    label: 'AMBER',
    code: 'P3',
    cmd: 'phosphor.amber',
    swatch: '#ffb000',
    note: 'warm vintage CRT',
  },
  {
    id: 'ice',
    label: 'ICE',
    code: 'P4',
    cmd: 'phosphor.ice',
    swatch: '#7df9ff',
    note: 'cold deep-space console',
  },
  {
    id: 'red',
    label: 'RED',
    code: 'DEFCON',
    cmd: 'alert.red',
    swatch: '#ff3b3b',
    note: 'red-alert console',
  },
]

export const DEFAULT_THEME = 'green'
export const DEFAULT_CUSTOM_COLOR = '#b14dff'
export const STORAGE_KEY = 'term-ui:theme'
export const STORAGE_KEY_CUSTOM = 'term-ui:custom'
export const STORAGE_KEY_SAVED = 'term-ui:saved-colors'
export const MAX_SAVED_COLORS = 8

/* a few off-preset phosphor colours for the quick-pick row */
export const QUICK_COLORS = ['#b14dff', '#ff3df0', '#9dff00', '#38bdf8', '#ff7a18']

export const isValidTheme = (id) => id === 'custom' || THEMES.some((t) => t.id === id)
