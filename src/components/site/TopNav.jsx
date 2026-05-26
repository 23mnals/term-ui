import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ThemeSwitcher } from './ThemeSwitcher.jsx'
import { Logo } from './Logo.jsx'

const LINKS = [
  { to: '/components', label: './components' },
  { to: '/templates', label: './templates' },
  { to: '/showcase', label: './showcase' },
]

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [loc.pathname])

  const linkClass = ({ isActive }) =>
    ['tm-nav__link', isActive && 'is-active'].filter(Boolean).join(' ')
  const drawerClass = ({ isActive }) =>
    ['tm-nav__dlink', isActive && 'is-active'].filter(Boolean).join(' ')

  return (
    <header className="tm-nav">
      <div className="tm-nav__inner">
        <NavLink to="/" className="tm-nav__brand">
          <Logo size={23} className="tm-nav__logo" />
          <span className="tm-nav__brandname">
            TERM<span className="tm-nav__slash">/</span>UI
          </span>
        </NavLink>

        <nav className="tm-nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="tm-nav__right">
          <ThemeSwitcher />
          <NavLink className="tm-nav__login" to="/login">
            [ LOGIN ]
          </NavLink>
          <button
            type="button"
            className="tm-nav__burger"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? '[ X ]' : '[ ≡ ]'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="tm-nav__drawer" aria-label="Mobile">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={drawerClass}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/login" className={drawerClass}>
            ./login
          </NavLink>
        </nav>
      )}
    </header>
  )
}
