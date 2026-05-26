/**
 * Footer — the bottom status bar of the console.
 */
export function Footer() {
  return (
    <footer className="tm-foot">
      <div className="tm-foot__rule" aria-hidden="true" />
      <div className="tm-foot__inner">
        <div className="tm-foot__col">
          <span className="tm-foot__brand">{'>_'} TERM/UI</span>
          <span className="tm-foot__line tm-dim">
            terminal-cli component system :: v0.1.0
          </span>
        </div>
        <div className="tm-foot__col tm-foot__col--links">
          <a className="tm-foot__link" href="#/components">
            ./components
          </a>
          <a className="tm-foot__link" href="#/templates">
            ./templates
          </a>
          <a className="tm-foot__link" href="#/showcase">
            ./showcase
          </a>
        </div>
        <div className="tm-foot__col tm-foot__col--end">
          <span className="tm-foot__line tm-dim">
            STATUS: <span className="tm-foot__ok">ONLINE</span>
          </span>
          <span className="tm-foot__line tm-dim">
            built with react + vite — no framework lock-in
          </span>
        </div>
      </div>
    </footer>
  )
}
