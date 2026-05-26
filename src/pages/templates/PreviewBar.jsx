import { Link } from 'react-router-dom'
import { ThemeSwitcher } from '../../components/site/ThemeSwitcher.jsx'

/**
 * PreviewBar — the thin strip that sits above a full-screen template
 * preview. Lets you escape back to the docs and re-theme on the spot.
 */
export function PreviewBar({ name }) {
  return (
    <div className="tpv-bar">
      <Link to="/templates" className="tpv-bar__back">
        <span aria-hidden="true">←</span> term/ui :: templates
      </Link>
      <span className="tpv-bar__tag" aria-hidden="true">
        PREVIEW // {name}
      </span>
      <ThemeSwitcher />
    </div>
  )
}
