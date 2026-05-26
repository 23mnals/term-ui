import { useParams, Navigate, Link } from 'react-router-dom'
import { Sidebar } from '../components/ui/Sidebar.jsx'
import { COMPONENT_DOCS, SIDEBAR_GROUPS, getDoc } from '../data/componentDocs.jsx'

export function Components() {
  const { comp } = useParams()
  const entry = getDoc(comp)

  if (!entry) return <Navigate to="/components/button" replace />

  const { id, name, tagline, signature, Doc } = entry
  const idx = COMPONENT_DOCS.findIndex((c) => c.id === id)
  const prev = COMPONENT_DOCS[idx - 1]
  const next = COMPONENT_DOCS[idx + 1]

  return (
    <div className="tm-cmp">
      <div className="tm-shell tm-cmp__grid">
        <Sidebar groups={SIDEBAR_GROUPS} />

        <div className="tm-cmp__main">
          <header className="tm-cmp__banner">
            <p className="tm-cmp__crumbs">
              <span className="tm-prompt">$</span> cat ~/components/ui/{id}.jsx
            </p>
            <div className="tm-cmp__headrow">
              <h1 className="tm-cmp__title">{name}</h1>
              <span className="tm-cmp__index">
                {String(idx + 1).padStart(2, '0')} / {String(COMPONENT_DOCS.length).padStart(2, '0')}
              </span>
            </div>
            <p className="tm-cmp__tagline">{tagline}</p>
            <code className="tm-cmp__sig">{signature}</code>
          </header>

          <div className="tm-cmp__doc">
            <Doc />
          </div>

          <nav className="tm-cmp__pager" aria-label="component pager">
            {prev ? (
              <Link to={`/components/${prev.id}`} className="tm-cmp__pg">
                <span className="tm-cmp__pgdir">← prev</span>
                <span className="tm-cmp__pgname">{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/components/${next.id}`}
                className="tm-cmp__pg tm-cmp__pg--next"
              >
                <span className="tm-cmp__pgdir">next →</span>
                <span className="tm-cmp__pgname">{next.name}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </div>
    </div>
  )
}
