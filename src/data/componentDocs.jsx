import { useState } from 'react'
import {
  Button,
  Card,
  Input,
  Textarea,
  Tabs,
  Modal,
  Switch,
  Select,
  Checkbox,
  RadioGroup,
  Badge,
  Tooltip,
  Alert,
  Accordion,
  Table,
  WindowTabs,
  Sidebar,
  Loading,
  Typewriter,
  useToast,
} from '../components/ui/index.js'
import { ComponentPreview } from '../components/site/ComponentPreview.jsx'

/* ============================================================
   Shared doc primitives
   ============================================================ */
function Demo({ heading, sig, code, align = 'left', children }) {
  return (
    <section className="tm-doc__block">
      <h2 className="tm-doc__h">
        <span className="tm-doc__hmark" aria-hidden="true">
          //
        </span>{' '}
        {heading}
      </h2>
      <ComponentPreview title={sig} code={code} align={align}>
        {children}
      </ComponentPreview>
    </section>
  )
}

function PropsTable({ rows }) {
  return (
    <section className="tm-doc__block">
      <h2 className="tm-doc__h">
        <span className="tm-doc__hmark" aria-hidden="true">
          //
        </span>{' '}
        props / api
      </h2>
      <div className="tm-props" role="table">
        <div className="tm-props__row tm-props__row--head" role="row">
          <span role="columnheader">prop</span>
          <span role="columnheader">type</span>
          <span role="columnheader">default</span>
          <span role="columnheader">description</span>
        </div>
        {rows.map((r) => (
          <div className="tm-props__row" role="row" key={r.prop}>
            <span className="tm-props__prop" role="cell">
              {r.prop}
            </span>
            <span className="tm-props__type" role="cell">
              {r.type}
            </span>
            <span className="tm-props__def" role="cell">
              {r.def}
            </span>
            <span className="tm-props__desc" role="cell">
              {r.desc}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ============================================================
   BUTTON
   ============================================================ */
function ButtonDoc() {
  return (
    <>
      <Demo
        heading="variants"
        sig="Button.jsx"
        code={`<Button variant="primary">initiate</Button>
<Button variant="default">execute</Button>
<Button variant="dashed">attach</Button>
<Button variant="ghost">abort</Button>
<Button variant="link">read more</Button>`}
      >
        <Button variant="primary">initiate</Button>
        <Button variant="default">execute</Button>
        <Button variant="dashed">attach</Button>
        <Button variant="ghost">abort</Button>
        <Button variant="link">read more</Button>
      </Demo>

      <Demo
        heading="sizes"
        sig="Button.jsx"
        code={`<Button size="sm">small</Button>
<Button size="md">middle</Button>
<Button size="lg">large</Button>`}
      >
        <Button variant="default" size="sm">
          small
        </Button>
        <Button variant="default" size="md">
          middle
        </Button>
        <Button variant="default" size="lg">
          large
        </Button>
      </Demo>

      <Demo
        heading="hud"
        sig="Button.jsx"
        code={`<Button variant="hud">arm system</Button>
<Button variant="hud" size="sm">ping</Button>
<Button variant="hud" size="lg">deploy</Button>
<Button variant="hud" danger>self-destruct</Button>`}
      >
        <Button variant="hud">arm system</Button>
        <Button variant="hud" size="sm">ping</Button>
        <Button variant="hud" size="lg">deploy</Button>
        <Button variant="hud" danger>self-destruct</Button>
      </Demo>

      <Demo
        heading="states + icon"
        sig="Button.jsx"
        code={`<Button danger>delete</Button>
<Button loading>compiling</Button>
<Button disabled>locked</Button>
<Button icon="⌕">search</Button>
<Button variant="primary" block>block button</Button>`}
      >
        <Button variant="default" danger>
          delete
        </Button>
        <Button variant="primary" danger>
          force quit
        </Button>
        <Button variant="default" loading>
          compiling
        </Button>
        <Button variant="default" disabled>
          locked
        </Button>
        <Button variant="default" icon="⌕">
          search
        </Button>
      </Demo>

      <PropsTable
        rows={[
          {
            prop: 'variant',
            type: 'primary | default | dashed | ghost | link',
            def: 'default',
            desc: 'visual style of the command key',
          },
          { prop: 'size', type: 'sm | md | lg', def: 'md', desc: 'snapped size step' },
          { prop: 'danger', type: 'boolean', def: 'false', desc: 'recolour to the error channel' },
          { prop: 'loading', type: 'boolean', def: 'false', desc: 'show ascii spinner, disable input' },
          { prop: 'disabled', type: 'boolean', def: 'false', desc: 'inert / dimmed state' },
          { prop: 'block', type: 'boolean', def: 'false', desc: 'stretch to full container width' },
          { prop: 'icon', type: 'ReactNode', def: '—', desc: 'glyph rendered before the label' },
          { prop: 'onClick', type: '() => void', def: '—', desc: 'standard click handler' },
        ]}
      />
    </>
  )
}

/* ============================================================
   CARD
   ============================================================ */
function CardDoc() {
  return (
    <>
      <Demo
        heading="variants"
        sig="Card.jsx"
        code={`<Card title="system.status" variant="legend">
  Notched-legend pane. The title is cut into the border.
</Card>

<Card title="bootlog" variant="solid">
  Solid inverted title bar — heavier signal weight.
</Card>`}
        align="left"
      >
        <Card title="system.status" variant="legend" className="tm-doc__card">
          A notched-legend pane. The title sits cut into the top border, the way
          a labelled box is drawn on a schematic.
        </Card>
        <Card title="bootlog" variant="solid" className="tm-doc__card">
          A solid inverted title bar — use it when the pane needs heavier signal
          weight in the layout.
        </Card>
      </Demo>

      <Demo
        heading="status + footer"
        sig="Card.jsx"
        code={`<Card
  title="uplink"
  status="OK"
  footer={<span>last sync :: 04:21:09</span>}
>
  Status badge prints top-right. Footer is a dashed-rule strip.
</Card>`}
        align="left"
      >
        <Card
          title="uplink"
          status="OK"
          className="tm-doc__card"
          footer={<span>last sync :: 04:21:09 utc</span>}
        >
          Connection nominal. The status badge prints top-right; pass OK / WARN /
          ERR or your own node.
        </Card>
        <Card title="reactor" status="WARN" variant="solid" className="tm-doc__card">
          Coolant pressure drifting. WARN routes the badge through the secondary
          channel.
        </Card>
      </Demo>

      <Demo
        heading="hud"
        sig="Card.jsx"
        code={`<Card title="sector.seven" variant="hud" status="OK">
  Sci-fi HUD frame. Double border with outer glow,
  hatched corner brackets, and top/bottom center notch arrows.
</Card>`}
        align="left"
      >
        <Card title="sector.seven" variant="hud" status="OK" className="tm-doc__card">
          Sci-fi HUD frame. Double border with outer glow, hatched corner brackets,
          and top/bottom center notch arrows. Tracks the active theme color.
        </Card>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'title', type: 'string', def: '—', desc: 'pane label; omit for a bare box' },
          { prop: 'variant', type: 'legend | solid | hud', def: 'legend', desc: 'notched border / inverted bar / sci-fi HUD frame' },
          { prop: 'status', type: 'OK | ERR | WARN', def: '—', desc: 'status badge, top-right' },
          { prop: 'footer', type: 'ReactNode', def: '—', desc: 'dashed-rule footer strip' },
        ]}
      />
    </>
  )
}

/* ============================================================
   INPUT
   ============================================================ */
function InputDoc() {
  const [name, setName] = useState('')
  const [token, setToken] = useState('xKQ-9')

  return (
    <>
      <Demo
        heading="prompt field"
        sig="Input.jsx"
        code={`const [name, setName] = useState('')

<Input
  label="operator id"
  prompt="user@term:~$"
  placeholder="type to begin"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>`}
        align="left"
      >
        <div className="tm-doc__stack">
          <Input
            label="operator id"
            prompt="user@term:~$"
            placeholder="type to begin"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Demo>

      <Demo
        heading="error + disabled"
        sig="Input.jsx"
        code={`<Input
  label="access token"
  prompt="auth:~$"
  value={token}
  error="token rejected — expired or malformed"
  onChange={onChange}
/>

<Input label="locked field" value="read-only" disabled />`}
        align="left"
      >
        <div className="tm-doc__stack">
          <Input
            label="access token"
            prompt="auth:~$"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            error="token rejected — expired or malformed"
          />
          <Input
            label="locked field"
            prompt="sys:~$"
            value="read-only"
            disabled
            onChange={() => {}}
          />
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'label', type: 'string', def: '—', desc: 'caps label above the field' },
          { prop: 'prompt', type: 'string', def: 'user@term:~$', desc: 'shell prompt prefix' },
          { prop: 'value', type: 'string', def: "''", desc: 'controlled value' },
          { prop: 'onChange', type: '(e) => void', def: '—', desc: 'native change event' },
          { prop: 'placeholder', type: 'string', def: "''", desc: 'dim placeholder text' },
          { prop: 'error', type: 'string', def: "''", desc: 'error message — drives [ERR] state' },
          { prop: 'disabled', type: 'boolean', def: 'false', desc: 'inert / dimmed state' },
        ]}
      />
    </>
  )
}

/* ============================================================
   TABS
   ============================================================ */
function TabsDoc() {
  const items = [
    {
      id: 'cpu',
      label: 'cpu',
      content: (
        <p className="tm-doc__panel">
          CORE_0 .. CORE_7 online. Load average 0.42 — thermal envelope nominal.
        </p>
      ),
    },
    {
      id: 'mem',
      label: 'memory',
      content: (
        <p className="tm-doc__panel">
          12.4 GB / 32 GB resident. No swap pressure. Page faults: 14/s.
        </p>
      ),
    },
    {
      id: 'net',
      label: 'network',
      content: (
        <p className="tm-doc__panel">
          eth0 up — 940 Mbps. 3 active sockets. Latency to gateway: 0.8 ms.
        </p>
      ),
    },
    { id: 'disk', label: 'disk', content: null, disabled: true },
  ]

  return (
    <>
      <Demo
        heading="window splits"
        sig="Tabs.jsx"
        code={`<Tabs
  defaultTab="cpu"
  items={[
    { id: 'cpu', label: 'cpu', content: <CpuPanel /> },
    { id: 'mem', label: 'memory', content: <MemPanel /> },
    { id: 'net', label: 'network', content: <NetPanel /> },
    { id: 'disk', label: 'disk', content: null, disabled: true },
  ]}
/>`}
        align="left"
      >
        <div className="tm-doc__full">
          <Tabs defaultTab="cpu" items={items} />
          <p className="tm-doc__hint tm-dim">
            ↹ focus the strip, then ← → to move between tabs.
          </p>
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'items', type: '{ id, label, content, disabled }[]', def: '[]', desc: 'tab definitions' },
          { prop: 'defaultTab', type: 'string', def: 'items[0].id', desc: 'uncontrolled initial tab' },
          { prop: 'value', type: 'string', def: '—', desc: 'controlled active tab id' },
          { prop: 'onChange', type: '(id) => void', def: '—', desc: 'fires on tab change' },
        ]}
      />
    </>
  )
}

/* ============================================================
   MODAL
   ============================================================ */
function ModalDoc() {
  const [open, setOpen] = useState(null)

  return (
    <>
      <Demo
        heading="system window"
        sig="Modal.jsx"
        code={`const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>open dialog</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="confirm.exe"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>cancel</Button>
      <Button variant="primary" onClick={() => setOpen(false)}>confirm</Button>
    </>
  }
>
  Esc closes. Focus is trapped. Body scroll locks while open.
</Modal>`}
        align="left"
      >
        <Button variant="default" onClick={() => setOpen('default')}>
          open dialog
        </Button>
        <Button variant="default" danger onClick={() => setOpen('danger')}>
          open alert
        </Button>

        <Modal
          open={open === 'default'}
          onClose={() => setOpen(null)}
          title="confirm.exe"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setOpen(null)}>
                cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => setOpen(null)}>
                confirm
              </Button>
            </>
          }
        >
          The pane boots in with a CRT scan-on effect. Press{' '}
          <strong>Esc</strong> to close — focus is trapped inside and returned to
          the trigger on exit.
        </Modal>

        <Modal
          open={open === 'danger'}
          onClose={() => setOpen(null)}
          title="purge.sh"
          tone="danger"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setOpen(null)}>
                keep
              </Button>
              <Button variant="primary" size="sm" danger onClick={() => setOpen(null)}>
                purge all
              </Button>
            </>
          }
        >
          This will drop 1,204 records and cannot be undone. The danger tone
          routes the whole window through the error channel.
        </Modal>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'open', type: 'boolean', def: 'false', desc: 'visibility — fully controlled' },
          { prop: 'onClose', type: '() => void', def: '—', desc: 'fires on Esc / backdrop / x' },
          { prop: 'title', type: 'string', def: 'SYSTEM', desc: 'title-bar label' },
          { prop: 'tone', type: 'default | danger', def: 'default', desc: 'colour channel of the window' },
          { prop: 'footer', type: 'ReactNode', def: '—', desc: 'action row, bottom-right' },
          { prop: 'closeOnBackdrop', type: 'boolean', def: 'true', desc: 'click scrim to dismiss' },
        ]}
      />
    </>
  )
}

/* ============================================================
   SWITCH
   ============================================================ */
function SwitchDoc() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)

  return (
    <>
      <Demo
        heading="power toggle"
        sig="Switch.jsx"
        code={`const [on, setOn] = useState(false)

<Switch checked={on} onChange={setOn} label="telemetry uplink" />`}
        align="left"
      >
        <div className="tm-doc__stack">
          <Switch checked={a} onChange={setA} label="telemetry uplink" />
          <Switch checked={b} onChange={setB} label="verbose logging" />
          <Switch checked disabled label="kernel guard (locked)" />
        </div>
      </Demo>

      <Demo
        heading="sizes"
        sig="Switch.jsx"
        code={`<Switch size="sm" checked={on} onChange={setOn} />
<Switch size="md" checked={on} onChange={setOn} />
<Switch size="lg" checked={on} onChange={setOn} />`}
      >
        <Switch size="sm" checked={a} onChange={setA} />
        <Switch size="md" checked={a} onChange={setA} />
        <Switch size="lg" checked={a} onChange={setA} />
      </Demo>

      <PropsTable
        rows={[
          { prop: 'checked', type: 'boolean', def: 'false', desc: 'on / off state' },
          { prop: 'onChange', type: '(next) => void', def: '—', desc: 'receives the next boolean' },
          { prop: 'size', type: 'sm | md | lg', def: 'md', desc: 'track size step' },
          { prop: 'label', type: 'string', def: '—', desc: 'text printed beside the track' },
          { prop: 'disabled', type: 'boolean', def: 'false', desc: 'inert / dimmed state' },
        ]}
      />
    </>
  )
}

/* ============================================================
   SELECT
   ============================================================ */
function SelectDoc() {
  const [shell, setShell] = useState('zsh')

  const options = [
    { value: 'bash', label: 'bash — bourne again' },
    { value: 'zsh', label: 'zsh — z shell' },
    { value: 'fish', label: 'fish — friendly interactive' },
    { value: 'pwsh', label: 'pwsh — powershell core' },
    { value: 'csh', label: 'csh — c shell (deprecated)', disabled: true },
  ]

  return (
    <>
      <Demo
        heading="listbox dropdown"
        sig="Select.jsx"
        code={`const [shell, setShell] = useState('zsh')

<Select
  label="default shell"
  value={shell}
  onChange={setShell}
  options={[
    { value: 'bash', label: 'bash — bourne again' },
    { value: 'zsh',  label: 'zsh — z shell' },
    { value: 'fish', label: 'fish — friendly interactive' },
    { value: 'csh',  label: 'csh — c shell', disabled: true },
  ]}
/>`}
        align="left"
      >
        <div className="tm-doc__stack tm-doc__stack--w">
          <Select
            label="default shell"
            value={shell}
            onChange={setShell}
            options={options}
          />
          <Select
            label="locked selector"
            value="bash"
            onChange={() => {}}
            options={options}
            disabled
          />
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'options', type: '{ value, label, disabled }[]', def: '[]', desc: 'selectable entries' },
          { prop: 'value', type: 'string', def: '—', desc: 'controlled selected value' },
          { prop: 'onChange', type: '(value) => void', def: '—', desc: 'fires with the chosen value' },
          { prop: 'placeholder', type: 'string', def: 'select_option', desc: 'shown when nothing is chosen' },
          { prop: 'label', type: 'string', def: '—', desc: 'caps label above the control' },
          { prop: 'disabled', type: 'boolean', def: 'false', desc: 'inert / dimmed state' },
        ]}
      />
    </>
  )
}

/* ============================================================
   CHECKBOX
   ============================================================ */
function CheckboxDoc() {
  const [flags, setFlags] = useState({ verbose: true, dry: false })

  return (
    <>
      <Demo
        heading="ascii toggle box"
        sig="Checkbox.jsx"
        code={`const [verbose, setVerbose] = useState(true)

<Checkbox
  checked={verbose}
  onChange={setVerbose}
  label="--verbose"
/>`}
        align="left"
      >
        <div className="tm-doc__stack">
          <Checkbox
            checked={flags.verbose}
            onChange={(v) => setFlags((f) => ({ ...f, verbose: v }))}
            label="--verbose   print every step"
          />
          <Checkbox
            checked={flags.dry}
            onChange={(v) => setFlags((f) => ({ ...f, dry: v }))}
            label="--dry-run   simulate, write nothing"
          />
          <Checkbox indeterminate label="--recursive (partial selection)" onChange={() => {}} />
          <Checkbox checked disabled label="--force (locked by policy)" onChange={() => {}} />
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'checked', type: 'boolean', def: 'false', desc: 'checked state — [X]' },
          { prop: 'indeterminate', type: 'boolean', def: 'false', desc: 'partial state — [-]' },
          { prop: 'onChange', type: '(next) => void', def: '—', desc: 'receives the next boolean' },
          { prop: 'label', type: 'string', def: '—', desc: 'text printed beside the box' },
          { prop: 'disabled', type: 'boolean', def: 'false', desc: 'inert / dimmed state' },
        ]}
      />
    </>
  )
}

/* ============================================================
   RADIO
   ============================================================ */
function RadioDoc() {
  const [shell, setShell] = useState('zsh')
  const options = [
    { value: 'bash', label: 'bash — bourne again' },
    { value: 'zsh', label: 'zsh — z shell' },
    { value: 'fish', label: 'fish — friendly interactive' },
    { value: 'csh', label: 'csh — deprecated', disabled: true },
  ]
  return (
    <>
      <Demo
        heading="single select"
        sig="Radio.jsx"
        code={`const [shell, setShell] = useState('zsh')

<RadioGroup
  value={shell}
  onChange={setShell}
  options={[
    { value: 'bash', label: 'bash — bourne again' },
    { value: 'zsh',  label: 'zsh — z shell' },
    { value: 'fish', label: 'fish — friendly interactive' },
    { value: 'csh',  label: 'csh — deprecated', disabled: true },
  ]}
/>`}
        align="left"
      >
        <div className="tm-doc__stack">
          <RadioGroup value={shell} onChange={setShell} options={options} />
          <p className="tm-doc__hint tm-dim">
            ↹ focus the group, then ↑ ↓ to move the selection.
          </p>
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'options', type: '{ value, label, disabled }[]', def: '[]', desc: 'radio entries' },
          { prop: 'value', type: 'string', def: '—', desc: 'controlled selected value' },
          { prop: 'onChange', type: '(value) => void', def: '—', desc: 'fires with the chosen value' },
          { prop: 'disabled', type: 'boolean', def: 'false', desc: 'disable the whole group' },
        ]}
      />
    </>
  )
}

/* ============================================================
   TEXTAREA
   ============================================================ */
function TextareaDoc() {
  const [body, setBody] = useState('')
  return (
    <>
      <Demo
        heading="multi-line buffer"
        sig="Textarea.jsx"
        code={`const [body, setBody] = useState('')

<Textarea
  label="commit message"
  prompt="git:~$ commit -m"
  rows={4}
  placeholder="describe the change"
  value={body}
  onChange={(e) => setBody(e.target.value)}
/>`}
        align="left"
      >
        <div className="tm-doc__stack tm-doc__stack--w">
          <Textarea
            label="commit message"
            prompt="git:~$ commit -m"
            rows={4}
            placeholder="describe the change"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <Textarea
            label="locked buffer"
            rows={3}
            value="read-only output stream"
            disabled
            onChange={() => {}}
          />
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'label', type: 'string', def: '—', desc: 'caps label above the field' },
          { prop: 'prompt', type: 'string', def: '—', desc: 'optional shell tag, top-left' },
          { prop: 'value', type: 'string', def: "''", desc: 'controlled value' },
          { prop: 'onChange', type: '(e) => void', def: '—', desc: 'native change event' },
          { prop: 'rows', type: 'number', def: '4', desc: 'initial visible row count' },
          { prop: 'error', type: 'string', def: "''", desc: 'error message — drives [ERR] state' },
          { prop: 'disabled', type: 'boolean', def: 'false', desc: 'inert / dimmed state' },
        ]}
      />
    </>
  )
}

/* ============================================================
   BADGE
   ============================================================ */
function BadgeDoc() {
  return (
    <>
      <Demo
        heading="tones"
        sig="Badge.jsx"
        code={`<Badge tone="primary">online</Badge>
<Badge tone="secondary">beta</Badge>
<Badge tone="error">offline</Badge>
<Badge tone="muted">draft</Badge>
<Badge tone="default">v2.1.0</Badge>`}
      >
        <Badge tone="primary">online</Badge>
        <Badge tone="secondary">beta</Badge>
        <Badge tone="error">offline</Badge>
        <Badge tone="muted">draft</Badge>
        <Badge tone="default">v2.1.0</Badge>
      </Demo>

      <Demo
        heading="solid + dot"
        sig="Badge.jsx"
        code={`<Badge tone="primary" variant="solid">stable</Badge>
<Badge tone="error" variant="solid">down</Badge>
<Badge tone="primary" dot>live</Badge>`}
      >
        <Badge tone="primary" variant="solid">
          stable
        </Badge>
        <Badge tone="secondary" variant="solid">
          queued
        </Badge>
        <Badge tone="error" variant="solid">
          down
        </Badge>
        <Badge tone="primary" dot>
          live
        </Badge>
        <Badge tone="error" dot>
          alert
        </Badge>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'children', type: 'ReactNode', def: '—', desc: 'badge label' },
          {
            prop: 'tone',
            type: 'default | primary | secondary | error | muted',
            def: 'default',
            desc: 'colour channel',
          },
          { prop: 'variant', type: 'outline | solid', def: 'outline', desc: 'bracketed text vs filled block' },
          { prop: 'dot', type: 'boolean', def: 'false', desc: 'leading status dot' },
        ]}
      />
    </>
  )
}

/* ============================================================
   TOOLTIP
   ============================================================ */
function TooltipDoc() {
  return (
    <>
      <Demo
        heading="hint popover"
        sig="Tooltip.jsx"
        code={`<Tooltip content="run the build pipeline" placement="top">
  <Button>deploy</Button>
</Tooltip>`}
        align="center"
      >
        <Tooltip content="run the build pipeline" placement="top">
          <Button variant="default">hover · top</Button>
        </Tooltip>
        <Tooltip content="rolls back one commit" placement="bottom">
          <Button variant="default">bottom</Button>
        </Tooltip>
        <Tooltip content="opens the log drawer" placement="left">
          <Button variant="default">left</Button>
        </Tooltip>
        <Tooltip content="pid 1041 · 12% cpu" placement="right">
          <Button variant="default">right</Button>
        </Tooltip>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'content', type: 'ReactNode', def: '—', desc: 'the hint text' },
          {
            prop: 'placement',
            type: 'top | bottom | left | right',
            def: 'top',
            desc: 'side the popover sits on',
          },
          { prop: 'children', type: 'ReactNode', def: '—', desc: 'the trigger element' },
        ]}
      />
    </>
  )
}

/* ============================================================
   ALERT
   ============================================================ */
function AlertDoc() {
  const [open, setOpen] = useState(true)
  return (
    <>
      <Demo
        heading="tones"
        sig="Alert.jsx"
        code={`<Alert tone="info" title="heads up">A newer build is available.</Alert>
<Alert tone="success" title="deployed">Shipped to 38 regions.</Alert>
<Alert tone="warning" title="latency">Gateway p99 above 200ms.</Alert>
<Alert tone="error" title="socket lost">Reconnecting — retry 1/3.</Alert>`}
        align="left"
      >
        <div className="tm-doc__stack tm-doc__stack--full">
          <Alert tone="info" title="heads up">
            A newer build is available — run acme pull to sync.
          </Alert>
          <Alert tone="success" title="deployed">
            Build shipped to 38 edge regions in 1.2 seconds.
          </Alert>
          <Alert tone="warning" title="latency">
            Gateway p99 climbed above 200ms in eu-west-3.
          </Alert>
          <Alert tone="error" title="socket lost">
            Connection dropped — reconnecting, retry 1/3.
          </Alert>
        </div>
      </Demo>

      <Demo
        heading="dismissible"
        sig="Alert.jsx"
        code={`const [open, setOpen] = useState(true)

{open && (
  <Alert tone="warning" title="unsaved changes" onClose={() => setOpen(false)}>
    Pass onClose to render the dismiss control.
  </Alert>
)}`}
        align="left"
      >
        <div className="tm-doc__stack tm-doc__stack--full">
          {open ? (
            <Alert
              tone="warning"
              title="unsaved changes"
              onClose={() => setOpen(false)}
            >
              Pass onClose to render the [✕] dismiss control. Close this, then
              restore it below.
            </Alert>
          ) : (
            <Button variant="dashed" onClick={() => setOpen(true)}>
              restore alert
            </Button>
          )}
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'children', type: 'ReactNode', def: '—', desc: 'body content' },
          {
            prop: 'tone',
            type: 'info | success | warning | error',
            def: 'info',
            desc: 'colour channel + status glyph',
          },
          { prop: 'title', type: 'string', def: '—', desc: 'bold caps heading' },
          { prop: 'onClose', type: '() => void', def: '—', desc: 'pass to render a dismiss control' },
        ]}
      />
    </>
  )
}

/* ============================================================
   ACCORDION
   ============================================================ */
function AccordionDoc() {
  const items = [
    {
      id: 'install',
      label: '01 · installation',
      content: (
        <p className="tm-doc__panel">
          Run npm install, then import components from the ui barrel. No peer
          configuration, no build plugin.
        </p>
      ),
    },
    {
      id: 'theme',
      label: '02 · theming',
      content: (
        <p className="tm-doc__panel">
          Every colour is a CSS variable. Swap the [data-theme] attribute or
          inject a custom palette — components follow automatically.
        </p>
      ),
    },
    {
      id: 'a11y',
      label: '03 · accessibility',
      content: (
        <p className="tm-doc__panel">
          Keyboard paths, focus traps and ARIA roles ship wired in, not bolted
          on afterwards.
        </p>
      ),
    },
  ]
  return (
    <>
      <Demo
        heading="collapsible panels"
        sig="Accordion.jsx"
        code={`<Accordion
  defaultOpen="install"
  items={[
    { id: 'install', label: '01 · installation',  content: <Install /> },
    { id: 'theme',   label: '02 · theming',       content: <Theme /> },
    { id: 'a11y',    label: '03 · accessibility', content: <A11y /> },
  ]}
/>`}
        align="left"
      >
        <div className="tm-doc__full">
          <Accordion defaultOpen="install" items={items} />
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'items', type: '{ id, label, content }[]', def: '[]', desc: 'panel definitions' },
          { prop: 'multiple', type: 'boolean', def: 'false', desc: 'allow several panels open at once' },
          { prop: 'defaultOpen', type: 'string | string[]', def: '[]', desc: 'panel id(s) open on mount' },
        ]}
      />
    </>
  )
}

/* ============================================================
   TOAST
   ============================================================ */
function ToastDoc() {
  const { push } = useToast()
  return (
    <>
      <Demo
        heading="notifications"
        sig="Toast.jsx"
        code={`const { push } = useToast()

<Button
  onClick={() =>
    push({
      tone: 'success',
      title: 'deployed',
      message: 'build shipped to 38 regions',
    })
  }
>
  notify
</Button>`}
        align="left"
      >
        <Button
          variant="default"
          onClick={() =>
            push({ tone: 'info', title: 'sync', message: 'mirror updated — 1,204 files' })
          }
        >
          info
        </Button>
        <Button
          variant="default"
          onClick={() =>
            push({
              tone: 'success',
              title: 'deployed',
              message: 'build shipped to 38 regions',
            })
          }
        >
          success
        </Button>
        <Button
          variant="default"
          onClick={() =>
            push({ tone: 'warning', title: 'latency', message: 'gateway p99 above 200ms' })
          }
        >
          warning
        </Button>
        <Button
          variant="default"
          danger
          onClick={() =>
            push({ tone: 'error', title: 'socket lost', message: 'reconnecting — retry 1/3' })
          }
        >
          error
        </Button>
      </Demo>

      <PropsTable
        rows={[
          { prop: '<ToastProvider>', type: 'component', def: '—', desc: 'wrap the app once, near the root' },
          { prop: 'useToast()', type: '() => { push, dismiss }', def: '—', desc: 'hook to reach the queue' },
          { prop: 'push(opts)', type: '(opts | string) => id', def: '—', desc: 'enqueue a toast; returns its id' },
          {
            prop: 'opts.tone',
            type: 'info | success | warning | error',
            def: 'info',
            desc: 'colour channel + glyph',
          },
          { prop: 'opts.title', type: 'string', def: "''", desc: 'bold caps heading' },
          { prop: 'opts.message', type: 'string', def: "''", desc: 'body line' },
          { prop: 'opts.duration', type: 'number (ms)', def: '4200', desc: 'auto-dismiss delay; 0 keeps it' },
        ]}
      />
    </>
  )
}

/* ============================================================
   TABLE
   ============================================================ */
function TableDoc() {
  const columns = [
    { key: 'pid', header: 'pid' },
    { key: 'svc', header: 'service' },
    { key: 'cpu', header: 'cpu', align: 'right' },
    {
      key: 'state',
      header: 'state',
      render: (r) => (
        <Badge
          variant="solid"
          tone={r.state === 'RUN' ? 'primary' : r.state === 'DOWN' ? 'error' : 'muted'}
        >
          {r.state}
        </Badge>
      ),
    },
  ]
  const data = [
    { pid: '1041', svc: 'gateway', cpu: '12.4%', state: 'RUN' },
    { pid: '2293', svc: 'indexer', cpu: '2.0%', state: 'IDLE' },
    { pid: '3110', svc: 'worker-07', cpu: '—', state: 'DOWN' },
    { pid: '0820', svc: 'scheduler', cpu: '8.1%', state: 'RUN' },
  ]
  return (
    <>
      <Demo
        heading="data table"
        sig="Table.jsx"
        code={`<Table
  caption="// process table"
  columns={[
    { key: 'pid', header: 'pid' },
    { key: 'svc', header: 'service' },
    { key: 'cpu', header: 'cpu', align: 'right' },
    {
      key: 'state',
      header: 'state',
      render: (r) => <Badge variant="solid">{r.state}</Badge>,
    },
  ]}
  data={rows}
/>`}
        align="left"
      >
        <div className="tm-doc__full">
          <Table columns={columns} data={data} caption="// process table" />
        </div>
      </Demo>

      <PropsTable
        rows={[
          {
            prop: 'columns',
            type: '{ key, header, align, render }[]',
            def: '[]',
            desc: 'column defs; render(row) for custom cells',
          },
          { prop: 'data', type: 'object[]', def: '[]', desc: 'row objects keyed by column.key' },
          { prop: 'caption', type: 'string', def: '—', desc: 'caption strip above the head' },
          { prop: 'dense', type: 'boolean', def: 'false', desc: 'tighter row padding' },
        ]}
      />
    </>
  )
}

/* ============================================================
   WINDOW TABS
   ============================================================ */
function WindowTabsDoc() {
  const tabs = [
    {
      id: 'wt-main',
      label: 'main.jsx',
      content: (
        <p className="tm-doc__panel">
          Entry point. Mounts the app under ThemeProvider + ToastProvider.
        </p>
      ),
    },
    {
      id: 'wt-theme',
      label: 'theme.css',
      content: (
        <p className="tm-doc__panel">
          Phosphor tokens — green / amber / ice / red, plus the custom HEX
          palette.
        </p>
      ),
    },
    {
      id: 'wt-readme',
      label: 'readme.md',
      content: (
        <p className="tm-doc__panel">
          A terminal-CLI component system. 20 components, every token
          centralized.
        </p>
      ),
    },
  ]
  return (
    <>
      <Demo
        heading="window tabs"
        sig="WindowTabs.jsx"
        code={`<WindowTabs
  defaultTabs={[
    { id: 'a', label: 'main.jsx',  content: <Main /> },
    { id: 'b', label: 'theme.css', content: <Theme /> },
  ]}
/>`}
        align="left"
      >
        <div className="tm-doc__full">
          <WindowTabs defaultTabs={tabs} />
          <p className="tm-doc__hint tm-dim">
            click a tab to switch · ✕ to close · [ + ] to open · ← → / Del on the
            strip.
          </p>
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'defaultTabs', type: '{ id, label, content }[]', def: '[]', desc: 'initial open tabs' },
          { prop: 'allowNew', type: 'boolean', def: 'true', desc: 'show the [ + ] new-tab button' },
          { prop: 'onNewTab', type: '() => tab', def: '—', desc: 'supply a custom tab for [ + ]' },
        ]}
      />
    </>
  )
}

/* ============================================================
   SIDEBAR
   ============================================================ */
function SidebarDoc() {
  const groups = [
    {
      label: 'components/forms',
      items: [
        { id: 'sb-btn', label: 'button', to: '/components/button' },
        { id: 'sb-in', label: 'input', to: '/components/input' },
        { id: 'sb-sw', label: 'switch', to: '/components/switch' },
      ],
    },
    {
      label: 'components/feedback',
      items: [
        { id: 'sb-toast', label: 'toast', to: '/components/toast' },
        { id: 'sb-modal', label: 'modal', to: '/components/modal' },
      ],
    },
  ]
  return (
    <>
      <Demo
        heading="file-tree nav"
        sig="Sidebar.jsx"
        code={`<Sidebar
  rootLabel="~/term-ui"
  groups={[
    {
      label: 'components/forms',
      items: [
        { id: 'btn', label: 'button', to: '/components/button' },
        { id: 'in',  label: 'input',  to: '/components/input' },
      ],
    },
  ]}
/>`}
        align="left"
      >
        <div className="tm-doc__stack tm-doc__stack--w">
          <Sidebar rootLabel="~/term-ui" groups={groups} />
          <p className="tm-doc__hint tm-dim">
            these items are live — clicking one navigates.
          </p>
        </div>
      </Demo>

      <PropsTable
        rows={[
          {
            prop: 'groups',
            type: '{ label, items }[]',
            def: '[]',
            desc: 'tree groups; items = { id, label, to }',
          },
          { prop: 'rootLabel', type: 'string', def: '~/term-ui/src', desc: 'path shown in the header' },
        ]}
      />
    </>
  )
}

/* ============================================================
   LOADING
   ============================================================ */
function LoadingDoc() {
  const [running, setRunning] = useState(false)
  return (
    <>
      <Demo
        heading="boot sequence"
        sig="Loading.jsx"
        code={`const [busy, setBusy] = useState(false)

<Button onClick={() => setBusy(true)}>run boot</Button>

{busy && (
  <Loading duration={3200} onComplete={() => setBusy(false)} />
)}`}
        align="left"
      >
        <div className="tm-doc__stack">
          <Button variant="primary" onClick={() => setRunning(true)}>
            run boot sequence
          </Button>
          <p className="tm-doc__hint tm-dim">
            full-screen — takes over for ~3.2s, then returns. follows the active
            theme.
          </p>
        </div>
        {running && (
          <Loading duration={3200} onComplete={() => setRunning(false)} />
        )}
      </Demo>

      <PropsTable
        rows={[
          { prop: 'title', type: 'string', def: 'TERM/UI', desc: 'wordmark; split on / for the accent' },
          { prop: 'duration', type: 'number (ms)', def: '2800', desc: 'length of the progress sweep' },
          { prop: 'onComplete', type: '() => void', def: '—', desc: 'fires when loading finishes' },
        ]}
      />
    </>
  )
}

/* ============================================================
   TYPEWRITER
   ============================================================ */
function TypewriterDoc() {
  const [run, setRun] = useState(0)
  return (
    <>
      <Demo
        heading="typing effect"
        sig="Typewriter.jsx"
        code={`<Typewriter
  text="initializing system protocols // standby"
  speed={46}
/>`}
        align="left"
      >
        <div className="tm-doc__stack tm-doc__stack--full">
          <p className="tm-doc__panel" key={run}>
            <span className="tm-prompt">&gt;</span>{' '}
            <Typewriter
              text="initializing system protocols // standby"
              speed={46}
            />
          </p>
          <Button variant="dashed" size="sm" onClick={() => setRun((n) => n + 1)}>
            replay
          </Button>
        </div>
      </Demo>

      <PropsTable
        rows={[
          { prop: 'text', type: 'string', def: "''", desc: 'string to type out' },
          { prop: 'speed', type: 'number (ms)', def: '42', desc: 'delay per character' },
          { prop: 'startDelay', type: 'number (ms)', def: '180', desc: 'pause before typing starts' },
          { prop: 'showCursor', type: 'boolean', def: 'true', desc: 'trailing block cursor' },
          { prop: 'onDone', type: '() => void', def: '—', desc: 'fires when typing completes' },
        ]}
      />
    </>
  )
}

/* ============================================================
   REGISTRY
   ============================================================ */
export const COMPONENT_DOCS = [
  /* --- forms --- */
  {
    id: 'button',
    name: 'Button',
    group: 'forms',
    tagline: 'A command key — brackets, inverted-video hover, five variants.',
    signature: '<Button variant="primary">run</Button>',
    Doc: ButtonDoc,
  },
  {
    id: 'input',
    name: 'Input',
    group: 'forms',
    tagline: 'A shell prompt field with a blinking block cursor.',
    signature: '<Input prompt="user@term:~$" />',
    Doc: InputDoc,
  },
  {
    id: 'textarea',
    name: 'Textarea',
    group: 'forms',
    tagline: 'A multi-line shell buffer with an optional prompt tag.',
    signature: '<Textarea rows={4} />',
    Doc: TextareaDoc,
  },
  {
    id: 'select',
    name: 'Select',
    group: 'forms',
    tagline: 'A custom listbox dropdown — keyboard-driven end to end.',
    signature: '<Select options={[…]} />',
    Doc: SelectDoc,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    group: 'forms',
    tagline: 'An ascii toggle box — [X] checked, [ ] empty, [-] mixed.',
    signature: '<Checkbox checked={on} />',
    Doc: CheckboxDoc,
  },
  {
    id: 'radio',
    name: 'Radio',
    group: 'forms',
    tagline: 'An ascii single-select — ( ) empty, (•) chosen.',
    signature: '<RadioGroup options={[…]} />',
    Doc: RadioDoc,
  },
  {
    id: 'switch',
    name: 'Switch',
    group: 'forms',
    tagline: 'A hardware power toggle — O / I, sliding block knob.',
    signature: '<Switch checked={on} onChange={…} />',
    Doc: SwitchDoc,
  },
  /* --- layout --- */
  {
    id: 'card',
    name: 'Card',
    group: 'layout',
    tagline: 'A window pane — notched-legend or solid inverted title bar.',
    signature: '<Card title="STATUS">…</Card>',
    Doc: CardDoc,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    group: 'layout',
    tagline: 'Collapsible panels — ▸ closed, ▾ open.',
    signature: '<Accordion items={[…]} />',
    Doc: AccordionDoc,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    group: 'layout',
    tagline: 'Vim-style window splits — fully arrow-key navigable.',
    signature: '<Tabs items={[…]} />',
    Doc: TabsDoc,
  },
  {
    id: 'table',
    name: 'Table',
    group: 'layout',
    tagline: 'An ascii data table with custom cell renderers.',
    signature: '<Table columns={[…]} data={[…]} />',
    Doc: TableDoc,
  },
  {
    id: 'windowtabs',
    name: 'WindowTabs',
    group: 'layout',
    tagline: 'Terminal window tabs — closeable, openable, keyboard-driven.',
    signature: '<WindowTabs defaultTabs={[…]} />',
    Doc: WindowTabsDoc,
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    group: 'layout',
    tagline: 'A terminal file-tree navigation panel.',
    signature: '<Sidebar groups={[…]} />',
    Doc: SidebarDoc,
  },
  /* --- feedback --- */
  {
    id: 'modal',
    name: 'Modal',
    group: 'feedback',
    tagline: 'A system window that boots in, traps focus and locks scroll.',
    signature: '<Modal open={open} onClose={…} />',
    Doc: ModalDoc,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    group: 'feedback',
    tagline: 'A hint popover — shows on hover and on keyboard focus.',
    signature: '<Tooltip content="…">…</Tooltip>',
    Doc: TooltipDoc,
  },
  {
    id: 'alert',
    name: 'Alert',
    group: 'feedback',
    tagline: 'An inline callout box with a status tag and accent rail.',
    signature: '<Alert tone="warning">…</Alert>',
    Doc: AlertDoc,
  },
  {
    id: 'badge',
    name: 'Badge',
    group: 'feedback',
    tagline: 'A compact status tag — outline or solid, five tones.',
    signature: '<Badge tone="primary">live</Badge>',
    Doc: BadgeDoc,
  },
  {
    id: 'toast',
    name: 'Toast',
    group: 'feedback',
    tagline: 'System notifications — push from anywhere, auto-dismiss.',
    signature: 'const { push } = useToast()',
    Doc: ToastDoc,
  },
  {
    id: 'loading',
    name: 'Loading',
    group: 'feedback',
    tagline: 'A full-screen terminal boot sequence — theme-aware.',
    signature: '<Loading onComplete={…} />',
    Doc: LoadingDoc,
  },
  {
    id: 'typewriter',
    name: 'Typewriter',
    group: 'feedback',
    tagline: 'Types text out character by character.',
    signature: '<Typewriter text="…" />',
    Doc: TypewriterDoc,
  },
]

const GROUP_LABEL = {
  forms: 'components/forms',
  layout: 'components/layout',
  feedback: 'components/feedback',
}

export const SIDEBAR_GROUPS = ['forms', 'layout', 'feedback'].map((g) => ({
  label: GROUP_LABEL[g],
  items: COMPONENT_DOCS.filter((c) => c.group === g).map((c) => ({
    id: c.id,
    label: c.id,
    to: `/components/${c.id}`,
  })),
}))

export function getDoc(id) {
  return COMPONENT_DOCS.find((c) => c.id === id) || null
}
