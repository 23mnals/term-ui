import { NavLink } from 'react-router-dom'

/**
 * Sidebar — a terminal file-tree. Used by the Components page.
 * groups: [{ label, items: [{ id, label, to }] }]
 */
export function Sidebar({ groups = [], rootLabel = '~/term-ui/src' }) {
  return (
    <aside className="tm-side">
      <div className="tm-side__head">
        <span className="tm-side__dollar" aria-hidden="true">
          $
        </span>
        <span className="tm-side__path">ls {rootLabel}</span>
      </div>
      <nav className="tm-side__tree" aria-label="Component index">
        {groups.map((g) => (
          <div key={g.label} className="tm-side__group">
            <p className="tm-side__glabel">{g.label}/</p>
            <ul className="tm-side__list">
              {g.items.map((it, i) => {
                const last = i === g.items.length - 1
                return (
                  <li key={it.id}>
                    <NavLink
                      to={it.to}
                      className={({ isActive }) =>
                        ['tm-side__item', isActive && 'is-active']
                          .filter(Boolean)
                          .join(' ')
                      }
                    >
                      <span className="tm-side__branch" aria-hidden="true">
                        {last ? '└─' : '├─'}
                      </span>
                      <span className="tm-side__name">{it.label}</span>
                      <span className="tm-side__ext" aria-hidden="true">
                        .jsx
                      </span>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
