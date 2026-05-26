/**
 * Logo — the TERM/UI brand mark: a solid phosphor tile with the
 * initial "T" knocked out. Theme-aware (fills are tokens), so it
 * recolours with the active phosphor profile. The static favicon
 * (public/favicon.svg) is the same mark, locked to green.
 */
export function Logo({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={['tm-logo', className].filter(Boolean).join(' ')}
      style={{ display: 'block' }}
    >
      <rect width="32" height="32" fill="var(--tm-primary)" />
      <rect x="6" y="7" width="20" height="5" fill="var(--tm-bg)" />
      <rect x="13" y="7" width="6" height="18" fill="var(--tm-bg)" />
    </svg>
  )
}
