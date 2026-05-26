import { THEMES } from '../theme/themes.js'

/* Demo gallery — illustrative projects that show the system in the wild. */
const PROJECTS = [
  {
    name: 'blockwatch',
    kind: 'defi dashboard',
    theme: 'green',
    art: ['┌──┬──┬──┐', '│▓▓│░░│▓▓│', '├──┴──┴──┤', '│▒▒▒▒▒▒▒▒│', '└────────┘'],
  },
  {
    name: 'tty-wallet',
    kind: 'crypto wallet',
    theme: 'amber',
    art: ['╔════════╗', '║ 0xA1F9 ║', '║ $ ████ ║', '║ send ▸  ║', '╚════════╝'],
  },
  {
    name: 'void.fm',
    kind: 'audio player',
    theme: 'ice',
    art: ['  ▁▃▅▇▅▃▁ ', ' ▃▅▇█▇▅▃▅ ', '▶ ──●───── ', ' 02:14 / 04', '  ◂◂ ▮▮ ▸▸ '],
  },
  {
    name: 'redline',
    kind: 'incident console',
    theme: 'red',
    art: ['! ALERT !!', '▔▔▔▔▔▔▔▔▔▔', 'P1 ███████', 'P2 ███░░░░', 'ack ▸ esc ◂'],
  },
  {
    name: 'grep.dev',
    kind: 'docs engine',
    theme: 'green',
    art: ['/ search _', '──────────', '> result 1', '> result 2', '> result 3'],
  },
  {
    name: '8bit-shop',
    kind: 'storefront',
    theme: 'amber',
    art: ['[ STORE ] ', '┌──┐ ┌──┐ ', '│$9│ │$5│ ', '└──┘ └──┘ ', 'cart ▸ [2]'],
  },
]

function swatchOf(id) {
  return (THEMES.find((t) => t.id === id) || THEMES[0]).swatch
}

export function Showcase() {
  return (
    <div className="tm-shell tm-show">
      <header className="tm-page-banner">
        <p className="tm-page-banner__crumbs">
          <span className="tm-prompt">$</span> ls ~/term-ui/showcase --built-with
        </p>
        <h1 className="tm-page-banner__title">Showcase</h1>
        <p className="tm-page-banner__lead">
          Interfaces built on the TERM/UI system. The grid below is a demo set —
          ship something real and it lands here.
        </p>
      </header>

      <div className="tm-show__grid">
        {PROJECTS.map((p) => (
          <article className="tm-show__card" key={p.name}>
            <div className="tm-show__bar">
              <span className="tm-show__name">{p.name}</span>
              <span
                className="tm-show__theme"
                style={{ background: swatchOf(p.theme) }}
                aria-hidden="true"
              />
            </div>
            <pre className="tm-show__art" aria-hidden="true">
              {p.art.join('\n')}
            </pre>
            <div className="tm-show__foot">
              <span className="tm-show__kind">{p.kind}</span>
              <span className="tm-show__themetag tm-dim">--theme={p.theme}</span>
            </div>
          </article>
        ))}

        <article className="tm-show__card tm-show__card--submit">
          <div className="tm-show__submit">
            <span className="tm-show__plus" aria-hidden="true">
              [ + ]
            </span>
            <h2 className="tm-show__submittitle">submit a build</h2>
            <p className="tm-show__submitbody tm-dim">
              Shipped something with TERM/UI? Open a pull request and add it to
              the wall.
            </p>
            <a
              className="tm-as-btn tm-as-btn--default"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              [ open PR ]
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}
