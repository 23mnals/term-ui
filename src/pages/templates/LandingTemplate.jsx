import { useState } from 'react'
import { Button, Card } from '../../components/ui/index.js'
import { Typewriter } from '../../components/ui/Typewriter.jsx'
import { ProgressBar } from '../../components/site/ProgressBar.jsx'
import { PreviewBar } from './PreviewBar.jsx'
import './templates.css'

const NAV = ['./product', './features', './pricing', './about']

const FEATURES = [
  {
    id: '01',
    title: 'Zero-config deploy',
    body: 'Push to main. The pipeline builds, tests and ships in under 90 seconds — no yaml archaeology required.',
  },
  {
    id: '02',
    title: 'Real-time sync',
    body: 'Every client holds the same state. Conflict resolution is automatic, deterministic and logged.',
  },
  {
    id: '03',
    title: 'Audit everything',
    body: 'Each mutation is recorded with actor, diff and timestamp. Replay any window of history on demand.',
  },
  {
    id: '04',
    title: 'Runs on the edge',
    body: 'Workloads execute in 38 regions. Requests resolve at the node nearest the operator.',
  },
]

const TIERS = [
  {
    name: 'HOBBY',
    price: '$0',
    unit: '/mo',
    note: 'for solo operators',
    feats: ['1 workspace', '5k requests / day', 'community support'],
    cta: 'start',
    primary: false,
  },
  {
    name: 'TEAM',
    price: '$24',
    unit: '/seat',
    note: 'most provisioned',
    feats: ['unlimited workspaces', '2M requests / day', 'priority support', 'audit log export'],
    cta: 'deploy team',
    primary: true,
  },
  {
    name: 'FLEET',
    price: 'CALL',
    unit: '',
    note: 'for the whole org',
    feats: ['dedicated regions', 'SLA 99.99%', 'SSO + SCIM', 'on-prem option'],
    cta: 'contact',
    primary: false,
  },
]

export function LandingTemplate() {
  const [year] = useState(() => new Date().getFullYear())

  return (
    <div className="tpv">
      <PreviewBar name="acme_sys landing" />

      <div className="tl">
        {/* ---- nav ---- */}
        <header className="tl-nav">
          <span className="tl-nav__brand">
            <span className="tl-nav__cur">{'>_'}</span> ACME_SYS.EXE
          </span>
          <nav className="tl-nav__links">
            {NAV.map((n) => (
              <span key={n} className="tl-nav__link">
                {n}
              </span>
            ))}
          </nav>
          <span className="tl-nav__login">[ LOGIN ]</span>
        </header>

        {/* ---- hero ---- */}
        <section className="tl-hero">
          <p className="tl-hero__kick">
            <span className="tm-prompt">{'>'}</span> INITIALIZING SYSTEM
            PROTOCOLS<span className="tm-cursor" />
          </p>
          <h1 className="tl-hero__title">
            <Typewriter text={'TRANSFORM THE WAY\nYOUR TEAM WORKS'} speed={40} />
          </h1>
          <p className="tl-hero__lead">
            Acme Platform brings your team together with a system designed to
            streamline workflows, boost throughput and keep every action on the
            record.
          </p>
          <div className="tl-hero__cta">
            <Button variant="primary" size="lg">
              start free trial
            </Button>
            <Button variant="dashed" size="lg">
              watch demo
            </Button>
          </div>
          <p className="tl-hero__status">
            STATUS: joined by 50,000+ teams already running Acme
          </p>
        </section>

        {/* ---- features ---- */}
        <section className="tl-sec">
          <div className="tl-sec__head">
            <span className="tl-sec__mark">//</span> CORE_MODULES
            <span className="tl-sec__rule" />
          </div>
          <div className="tl-feat">
            {FEATURES.map((f) => (
              <article className="tl-feat__cell" key={f.id}>
                <span className="tl-feat__id">{f.id}</span>
                <h3 className="tl-feat__title">{f.title}</h3>
                <p className="tl-feat__body">{f.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- metrics ---- */}
        <section className="tl-sec">
          <div className="tl-sec__head">
            <span className="tl-sec__mark">//</span> LIVE_METRICS
            <span className="tl-sec__rule" />
          </div>
          <div className="tl-metrics">
            <Card title="throughput" variant="solid" className="tl-metrics__card">
              <div className="tl-metrics__bars">
                <ProgressBar label="uptime / 30d" value={99} cells={28} />
                <ProgressBar label="requests served" value={87} cells={28} />
                <ProgressBar
                  label="edge cache hit"
                  value={94}
                  cells={28}
                  tone="secondary"
                />
              </div>
            </Card>
            <div className="tl-metrics__nums">
              <div className="tl-metrics__num">
                <span className="tl-metrics__big">38</span>
                <span className="tl-metrics__cap">edge regions</span>
              </div>
              <div className="tl-metrics__num">
                <span className="tl-metrics__big">90s</span>
                <span className="tl-metrics__cap">deploy time</span>
              </div>
              <div className="tl-metrics__num">
                <span className="tl-metrics__big">2.1B</span>
                <span className="tl-metrics__cap">events / day</span>
              </div>
              <div className="tl-metrics__num">
                <span className="tl-metrics__big">50k+</span>
                <span className="tl-metrics__cap">active teams</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- pricing ---- */}
        <section className="tl-sec">
          <div className="tl-sec__head">
            <span className="tl-sec__mark">//</span> PRICING_TABLE
            <span className="tl-sec__rule" />
          </div>
          <div className="tl-price">
            {TIERS.map((t) => (
              <article
                key={t.name}
                className={['tl-price__col', t.primary && 'is-primary']
                  .filter(Boolean)
                  .join(' ')}
              >
                <header className="tl-price__top">
                  <span className="tl-price__name">{t.name}</span>
                  <span className="tl-price__note">{t.note}</span>
                </header>
                <p className="tl-price__cost">
                  <span className="tl-price__amt">{t.price}</span>
                  <span className="tl-price__unit">{t.unit}</span>
                </p>
                <ul className="tl-price__feats">
                  {t.feats.map((f) => (
                    <li key={f} className="tl-price__feat">
                      <span className="tl-price__chk">[x]</span> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={t.primary ? 'primary' : 'default'}
                  block
                  size="md"
                >
                  {t.cta}
                </Button>
              </article>
            ))}
          </div>
        </section>

        {/* ---- cta ---- */}
        <section className="tl-end">
          <p className="tl-end__rule">
            {'//'} ════════════════════════════════════════ {'//'}
          </p>
          <h2 className="tl-end__title">READY TO DEPLOY?</h2>
          <p className="tl-end__sub">
            Spin up a workspace in 90 seconds. No credit card, no sales call.
          </p>
          <Button variant="primary" size="lg">
            $ acme init
          </Button>
        </section>

        {/* ---- footer ---- */}
        <footer className="tl-foot">
          <span>{'>_'} ACME_SYS.EXE</span>
          <span className="tl-foot__dim">
            (c) {year} acme systems — built on TERM/UI
          </span>
          <span className="tl-foot__dim">all systems operational</span>
        </footer>
      </div>
    </div>
  )
}
