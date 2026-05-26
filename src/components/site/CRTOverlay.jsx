/**
 * CRTOverlay — a non-interactive overlay that lays scanlines, a faint
 * vignette and a slow phosphor sweep over the whole viewport. Subtle
 * by design: depth without hurting readability.
 */
export function CRTOverlay() {
  return <div className="tm-crt" aria-hidden="true" />
}
