import { Link } from 'react-router-dom'
import { Button, Card } from '../components/ui/index.js'
import { Typewriter } from '../components/ui/Typewriter.jsx'
import { ProgressBar } from '../components/site/ProgressBar.jsx'
import { useTheme } from '../theme/ThemeProvider.jsx'

const BOOT_LOG = [
  ['mount /dev/term-ui', 'OK'],
  ['load phosphor.green', 'OK'],
  ['init 20 core components', 'OK'],
  ['link react@18 + router', 'OK'],
  ['audit a11y :: wcag 2.1 AA', 'OK'],
  ['count deps beyond react', '0'],
]

const STATS = [
  { n: '20', label: 'core components' },
  { n: '04', label: 'phosphor themes' },
  { n: '00', label: 'extra deps' },
  { n: 'AA', label: 'contrast rated' },
]

const FEATURES = [
  {
    tag: 'terminal-native',
    title: 'Not a reskin',
    body: 'Brackets, inverted-video hover, block cursors, ascii dividers. The command line is the design language — not a coat of paint over a generic kit.',
  },
  {
    tag: 'token-driven',
    title: 'Recolour in one swap',
    body: 'Every colour, size and glow is a CSS variable. Switching the phosphor profile re-themes the entire system — components included — with zero JS recolouring.',
  },
  {
    tag: 'runnable',
    title: 'Code, not a mockup',
    body: 'React + Vite. Copy a component straight from its CODE tab. Keyboard paths, focus traps and ARIA roles are wired in, not bolted on.',
  },
]

export function Home() {
  const { theme, setTheme, themes, customColor, setCustomColor } = useTheme()

  return (
    <div className="tm-home">
      {/* ---- HERO ---- */}
      <section className="tm-shell tm-hero">
        <div className="tm-hero__main">
          <p className="tm-hero__kicker">
            <span className="tm-prompt">{'>'}</span> ./term-ui --boot --theme={theme}
          </p>
          <h1 className="tm-hero__title">
            <Typewriter
              text={'A COMPONENT SYSTEM\nFOR THE COMMAND LINE.'}
              speed={38}
            />
          </h1>
          <p className="tm-hero__lead">
            TERM/UI is a terminal-CLI styled React component library. Twenty
            core components, four phosphor presets plus a custom HEX picker,
            every token centralized — built to look like the machine.
          </p>
          <div className="tm-hero__cta">
            <Link to="/components/button" className="tm-as-btn tm-as-btn--primary">
              ./components
            </Link>
            <Link to="/templates" className="tm-as-btn tm-as-btn--default">
              [ ./templates ]
            </Link>
          </div>
          <p className="tm-hero__status tm-dim">
            STATUS: 20 components // 4 presets + custom // react + vite
          </p>
        </div>

        <aside className="tm-hero__panel" aria-hidden="true">
          <div className="tm-bootwin">
            <div className="tm-bootwin__bar">
              <span>boot.log</span>
              <span className="tm-bootwin__dots">— □ x</span>
            </div>
            <div className="tm-bootwin__body">
              {BOOT_LOG.map(([msg, code]) => (
                <p className="tm-bootwin__line" key={msg}>
                  <span className="tm-bootwin__arrow">{'>'}</span> {msg}
                  <span className="tm-bootwin__fill" />
                  <span
                    className={
                      code === 'OK'
                        ? 'tm-bootwin__ok'
                        : 'tm-bootwin__num'
                    }
                  >
                    [{code}]
                  </span>
                </p>
              ))}
              <p className="tm-bootwin__line tm-bootwin__line--last">
                <span className="tm-bootwin__arrow">{'>'}</span> system ready
                <span className="tm-cursor" />
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* ---- STATS ---- */}
      <section className="tm-shell tm-stats">
        {STATS.map((s) => (
          <div className="tm-stats__cell" key={s.label}>
            <span className="tm-stats__n">{s.n}</span>
            <span className="tm-stats__label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ---- FEATURES ---- */}
      <section className="tm-shell tm-feat">
        <header className="tm-sec-head">
          <span className="tm-sec-head__mark" aria-hidden="true">
            //
          </span>
          <h2 className="tm-sec-head__title">why it reads as a terminal</h2>
          <span className="tm-sec-head__rule" aria-hidden="true" />
        </header>
        <div className="tm-feat__grid">
          {FEATURES.map((f) => (
            <article className="tm-feat__card" key={f.title}>
              <span className="tm-feat__tag">[ {f.tag} ]</span>
              <h3 className="tm-feat__title">{f.title}</h3>
              <p className="tm-feat__body">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---- THEME SWAP ---- */}
      <section className="tm-shell tm-themed">
        <div className="tm-themed__copy">
          <header className="tm-sec-head">
            <span className="tm-sec-head__mark" aria-hidden="true">
              //
            </span>
            <h2 className="tm-sec-head__title">swap the phosphor</h2>
          </header>
          <p className="tm-themed__lead">
            Four hand-tuned profiles, plus a custom HEX picker. Click a preset —
            or pick your own colour — and the whole site, every component and
            both templates re-theme instantly. One colour in, a full palette out.
          </p>
          <div className="tm-themed__chips" role="group" aria-label="theme">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                className={[
                  'tm-themed__chip',
                  t.id === theme && 'is-active',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => setTheme(t.id)}
              >
                <span
                  className="tm-themed__swatch"
                  style={{ background: t.swatch }}
                  aria-hidden="true"
                />
                <span className="tm-themed__chipname">{t.label}</span>
                <span className="tm-themed__chipcmd">--theme={t.cmd}</span>
              </button>
            ))}

            <label
              className={[
                'tm-themed__chip',
                'tm-themed__chip--custom',
                theme === 'custom' && 'is-active',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                type="color"
                className="tm-themed__colorinput"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                aria-label="custom theme colour"
              />
              <span
                className="tm-themed__swatch"
                style={{ background: customColor }}
                aria-hidden="true"
              />
              <span className="tm-themed__chipname">CUSTOM</span>
              <span className="tm-themed__chipcmd">
                --theme=hex · {customColor}
              </span>
            </label>
          </div>
        </div>

        <Card title="system.readout" variant="solid" className="tm-themed__card">
          <div className="tm-readout">
            <ProgressBar label="v1 core library" value={100} cells={22} />
            <ProgressBar label="keyboard coverage" value={100} cells={22} />
            <ProgressBar
              label="tokens centralized"
              value={100}
              cells={22}
              tone="secondary"
            />
            <ProgressBar
              label="framework lock-in"
              value={0}
              cells={22}
              tone="error"
            />
          </div>
        </Card>
      </section>

      {/* ---- CTA ---- */}
      <section className="tm-shell tm-cta">
        <div className="tm-cta__inner">
          <p className="tm-cta__line" aria-hidden="true">
            ════════════════════════════════════════════════
          </p>
          <h2 className="tm-cta__title">$ open ./components</h2>
          <p className="tm-cta__sub tm-dim">
            Twenty components, each with live previews and copy-ready source.
          </p>
          <div className="tm-cta__btns">
            <Link to="/components/button" className="tm-as-btn tm-as-btn--primary">
              browse the library
            </Link>
            <Link to="/showcase" className="tm-as-btn tm-as-btn--default">
              [ ./showcase ]
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
