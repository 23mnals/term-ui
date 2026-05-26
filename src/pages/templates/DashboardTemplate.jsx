import { useState } from 'react'
import { Card, Input, Switch, Button } from '../../components/ui/index.js'
import { ProgressBar } from '../../components/site/ProgressBar.jsx'
import { PreviewBar } from './PreviewBar.jsx'
import './templates.css'

const NAV = [
  { id: 'overview', label: 'overview', active: true },
  { id: 'processes', label: 'processes' },
  { id: 'network', label: 'network' },
  { id: 'storage', label: 'storage' },
  { id: 'logs', label: 'logs' },
  { id: 'settings', label: 'settings' },
]

const TILES = [
  { label: 'cpu load', value: 42, unit: '%', tone: 'primary' },
  { label: 'memory', value: 61, unit: '%', tone: 'primary' },
  { label: 'network', value: 78, unit: '%', read: '940mb/s', tone: 'secondary' },
  { label: 'disk', value: 84, unit: '%', tone: 'error' },
]

const PROCESSES = [
  { pid: '1041', name: 'term-ui-dev', cpu: '12.4', mem: '220M', state: 'RUN' },
  { pid: '0820', name: 'vite-watch', cpu: '8.1', mem: '180M', state: 'RUN' },
  { pid: '3110', name: 'asset-sync', cpu: '18.7', mem: '410M', state: 'RUN' },
  { pid: '2293', name: 'theme-engine', cpu: '2.0', mem: '64M', state: 'IDLE' },
  { pid: '0042', name: 'crt-overlay', cpu: '0.4', mem: '12M', state: 'IDLE' },
  { pid: '5501', name: 'audit-a11y', cpu: '0.0', mem: '8M', state: 'DONE' },
]

const EVENTS = [
  { t: '04:21:09', lvl: 'OK', msg: 'theme switched -> phosphor.amber' },
  { t: '04:20:54', lvl: 'OK', msg: 'build complete in 1.2s' },
  { t: '04:20:51', lvl: 'WARN', msg: 'cache miss on /components/select' },
  { t: '04:19:30', lvl: 'OK', msg: '8 components mounted' },
  { t: '04:18:05', lvl: 'OK', msg: 'socket reconnected' },
  { t: '04:18:02', lvl: 'ERR', msg: 'socket timeout — retry 1/3' },
]

export function DashboardTemplate() {
  const [query, setQuery] = useState('')
  const [live, setLive] = useState(true)

  const rows = PROCESSES.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div className="tpv">
      <PreviewBar name="node-01 ops console" />

      <div className="td">
        {/* ---- sidebar ---- */}
        <aside className="td-side">
          <div className="td-side__brand">
            <span className="td-side__cur">{'>_'}</span> NODE-01
          </div>
          <nav className="td-side__nav">
            {NAV.map((n) => (
              <span
                key={n.id}
                className={['td-side__item', n.active && 'is-active']
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="td-side__branch" aria-hidden="true">
                  {n.active ? '▸' : '·'}
                </span>
                {n.label}
              </span>
            ))}
          </nav>
          <div className="td-side__foot">
            <span className="td-side__fdim">region</span>
            <span>eu-west-3</span>
            <span className="td-side__fdim">uptime</span>
            <span className="td-side__ok">14d 02:11</span>
          </div>
        </aside>

        {/* ---- main ---- */}
        <main className="td-main">
          <header className="td-top">
            <div className="td-top__crumb">
              <span className="tm-prompt">$</span> ~/node-01 — system overview
            </div>
            <div className="td-top__tools">
              <div className="td-top__search">
                <Input
                  prompt="grep:~$"
                  placeholder="filter processes"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Switch checked={live} onChange={setLive} size="sm" label="live" />
              <Button variant="primary" size="sm">
                deploy
              </Button>
            </div>
          </header>

          {/* stat tiles */}
          <div className="td-tiles">
            {TILES.map((t) => (
              <div className="td-tile" key={t.label}>
                <span className="td-tile__label">{t.label}</span>
                <span className="td-tile__value">
                  {t.read || `${t.value}${t.unit}`}
                </span>
                <ProgressBar
                  value={t.value}
                  cells={16}
                  tone={t.tone}
                  showPct={false}
                />
              </div>
            ))}
          </div>

          {/* panels */}
          <div className="td-grid">
            <Card title="process.table" variant="solid" className="td-panel">
              <table className="td-table">
                <thead>
                  <tr>
                    <th>pid</th>
                    <th>process</th>
                    <th>cpu</th>
                    <th>mem</th>
                    <th>state</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.pid}>
                      <td className="td-table__pid">{p.pid}</td>
                      <td>{p.name}</td>
                      <td>{p.cpu}%</td>
                      <td>{p.mem}</td>
                      <td>
                        <span
                          className={`td-state td-state--${p.state.toLowerCase()}`}
                        >
                          {p.state}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="td-table__empty">
                        no process matches "{query}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>

            <Card title="event.log" variant="solid" className="td-panel">
              <ul className="td-log">
                {EVENTS.map((e, i) => (
                  <li className="td-log__row" key={i}>
                    <span className="td-log__time">{e.t}</span>
                    <span className={`td-log__lvl td-log__lvl--${e.lvl.toLowerCase()}`}>
                      [{e.lvl}]
                    </span>
                    <span className="td-log__msg">{e.msg}</span>
                  </li>
                ))}
                <li className="td-log__row td-log__row--live">
                  <span className="td-log__time">{live ? 'live' : 'idle'}</span>
                  <span className="td-log__lvl td-log__lvl--ok">[ • ]</span>
                  <span className="td-log__msg">
                    {live ? 'streaming events' : 'stream paused'}
                    <span className="tm-cursor" />
                  </span>
                </li>
              </ul>
            </Card>
          </div>

          <Card title="resource.meters" variant="legend" className="td-meters">
            <div className="td-meters__grid">
              <ProgressBar label="cpu thermal" value={54} cells={30} />
              <ProgressBar
                label="swap pressure"
                value={8}
                cells={30}
                tone="secondary"
              />
              <ProgressBar label="io throughput" value={71} cells={30} />
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
