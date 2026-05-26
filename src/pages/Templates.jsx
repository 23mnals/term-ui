import { Link } from 'react-router-dom'

const TEMPLATES = [
  {
    id: 'landing',
    name: 'ACME_SYS — Landing',
    kind: 'marketing / landing page',
    desc: 'A full product landing page — booting hero, feature grid, stat readouts, an ascii pricing table and a command-line CTA. Every section tracks the active theme.',
    sections: ['hero', 'features', 'metrics', 'pricing', 'cta'],
    to: '/preview/landing',
  },
  {
    id: 'dashboard',
    name: 'NODE-01 — Ops Console',
    kind: 'application / dashboard',
    desc: 'A monitoring console — sidebar nav, live stat tiles, ascii progress meters, a process table and a scrolling event log. Assembled entirely from TERM/UI primitives.',
    sections: ['sidebar', 'stat tiles', 'process table', 'event log'],
    to: '/preview/dashboard',
  },
]

function LandingThumb() {
  return (
    <div className="tm-thumb" aria-hidden="true">
      <div className="tm-thumb__bar">
        <span className="tm-thumb__dot" />
        <span className="tm-thumb__dot" />
        <span className="tm-thumb__dot" />
      </div>
      <div className="tm-thumb__body">
        <div className="tm-thumb__hero" />
        <div className="tm-thumb__row">
          <span className="tm-thumb__cell" />
          <span className="tm-thumb__cell" />
          <span className="tm-thumb__cell" />
        </div>
        <div className="tm-thumb__wide" />
      </div>
    </div>
  )
}

function DashboardThumb() {
  return (
    <div className="tm-thumb" aria-hidden="true">
      <div className="tm-thumb__bar">
        <span className="tm-thumb__dot" />
        <span className="tm-thumb__dot" />
        <span className="tm-thumb__dot" />
      </div>
      <div className="tm-thumb__body tm-thumb__body--split">
        <div className="tm-thumb__side">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="tm-thumb__panel">
          <div className="tm-thumb__tiles">
            <span className="tm-thumb__cell" />
            <span className="tm-thumb__cell" />
            <span className="tm-thumb__cell" />
            <span className="tm-thumb__cell" />
          </div>
          <div className="tm-thumb__wide" />
        </div>
      </div>
    </div>
  )
}

const THUMBS = { landing: <LandingThumb />, dashboard: <DashboardThumb /> }

export function Templates() {
  return (
    <div className="tm-shell tm-tpl">
      <header className="tm-page-banner">
        <p className="tm-page-banner__crumbs">
          <span className="tm-prompt">$</span> ls ~/term-ui/templates
        </p>
        <h1 className="tm-page-banner__title">Templates</h1>
        <p className="tm-page-banner__lead">
          Full pages assembled from the library. Launch one as a live, full-screen
          preview — it picks up whatever phosphor theme you have set.
        </p>
      </header>

      <div className="tm-tpl__grid">
        {TEMPLATES.map((t) => (
          <article className="tm-tpl__card" key={t.id}>
            <Link to={t.to} className="tm-tpl__thumblink" aria-label={`Open ${t.name}`}>
              {THUMBS[t.id]}
            </Link>
            <div className="tm-tpl__meta">
              <span className="tm-tpl__kind">[ {t.kind} ]</span>
              <h2 className="tm-tpl__name">{t.name}</h2>
              <p className="tm-tpl__desc">{t.desc}</p>
              <ul className="tm-tpl__sections">
                {t.sections.map((s) => (
                  <li key={s} className="tm-tpl__section">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="tm-tpl__actions">
                <Link to={t.to} className="tm-as-btn tm-as-btn--primary">
                  launch preview
                </Link>
                <a
                  className="tm-as-btn tm-as-btn--default"
                  href={`#${t.to}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  [ new tab ]
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
