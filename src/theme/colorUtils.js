/* ============================================================
   TERM/UI :: COLOUR UTILITIES
   Derives a full phosphor palette from a single accent hex.
   The user picks one colour; everything else (background tint,
   body text, dim/muted/border ramp, scanline) is computed so
   the custom theme stays internally consistent.
   ============================================================ */

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/** "#rgb" | "#rrggbb" -> { r, g, b } | null */
export function hexToRgb(hex) {
  if (typeof hex !== 'string') return null
  let h = hex.trim().replace(/^#/, '')
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }
  if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) return null
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

export function isValidHex(hex) {
  return hexToRgb(hex) !== null
}

/** { r,g,b } 0-255 -> { h:0-360, s:0-100, l:0-100 } */
export function rgbToHsl({ r, g, b }) {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === rn) h = (gn - bn) / d + (gn < bn ? 6 : 0)
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h *= 60
  }
  return { h, s: s * 100, l: l * 100 }
}

function hue2rgb(p, q, t) {
  let tt = t
  if (tt < 0) tt += 1
  if (tt > 1) tt -= 1
  if (tt < 1 / 6) return p + (q - p) * 6 * tt
  if (tt < 1 / 2) return q
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
  return p
}

/** h:0-360, s/l:0-100 -> "#rrggbb" */
export function hslToHex(h, s, l) {
  const hn = (((h % 360) + 360) % 360) / 360
  const sn = clamp(s, 0, 100) / 100
  const ln = clamp(l, 0, 100) / 100
  let r
  let g
  let b
  if (sn === 0) {
    r = g = b = ln
  } else {
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn
    const p = 2 * ln - q
    r = hue2rgb(p, q, hn + 1 / 3)
    g = hue2rgb(p, q, hn)
    b = hue2rgb(p, q, hn - 1 / 3)
  }
  const to = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

/* the CSS custom properties a generated palette writes */
export const PALETTE_VARS = [
  '--tm-bg',
  '--tm-bg-elevated',
  '--tm-bg-inset',
  '--tm-primary',
  '--tm-primary-rgb',
  '--tm-secondary',
  '--tm-secondary-rgb',
  '--tm-fg',
  '--tm-dim',
  '--tm-muted',
  '--tm-border',
  '--tm-border-bright',
  '--tm-error',
  '--tm-error-rgb',
  '--tm-scanline',
]

/**
 * generatePalette(hex) -> { cssVar: value } | null
 * Background channels carry a faint hue tint; the phosphor ramp
 * (fg/dim/muted/border) is desaturated off the accent so text
 * stays readable. secondary + error stay fixed so warnings and
 * errors never blend into the chosen colour.
 */
export function generatePalette(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  const { h, s } = rgbToHsl(rgb)

  return {
    '--tm-bg': hslToHex(h, Math.min(s, 24), 4),
    '--tm-bg-elevated': hslToHex(h, Math.min(s, 22), 7.5),
    '--tm-bg-inset': hslToHex(h, Math.min(s, 30), 3),
    '--tm-primary': hex,
    '--tm-primary-rgb': `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    '--tm-secondary': '#ffb000',
    '--tm-secondary-rgb': '255, 176, 0',
    '--tm-fg': hslToHex(h, Math.min(s * 0.55, 48), 80),
    '--tm-dim': hslToHex(h, Math.min(s * 0.5, 46), 47),
    '--tm-muted': hslToHex(h, Math.min(s * 0.55, 52), 24),
    '--tm-border': hslToHex(h, Math.min(s * 0.5, 50), 22),
    '--tm-border-bright': hslToHex(h, Math.min(s * 0.5, 50), 33),
    '--tm-error': '#ff4d4d',
    '--tm-error-rgb': '255, 77, 77',
    '--tm-scanline': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.05)`,
  }
}
