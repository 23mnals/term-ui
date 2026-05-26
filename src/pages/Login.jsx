import { useState } from 'react'
import { Input, Button, Checkbox } from '../components/ui/index.js'
import { useToast } from '../components/ui/Toast.jsx'

const LOCK = [
  '  ┌───┐  ',
  '  │   │  ',
  '┌─┴───┴─┐',
  '│ ▓ ▓ ▓ │',
  '│ ▓ █ ▓ │',
  '└───────┘',
]

export function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [remember, setRemember] = useState(true)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const { push } = useToast()

  const submit = (e) => {
    e.preventDefault()
    if (!user.trim()) {
      setErr('operator id required')
      return
    }
    setErr('')
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false)
      setPass('')
      push({
        tone: 'success',
        title: 'access granted',
        message: `session opened for ${user.trim()}`,
      })
    }, 1300)
  }

  return (
    <div className="tm-shell tm-login">
      <div className="tm-login__panel">
        <header className="tm-login__bar">
          <span className="tm-login__barname">// SECURE.SHELL</span>
          <span className="tm-login__barsig">:: auth</span>
        </header>

        <div className="tm-login__body">
          <pre className="tm-login__art" aria-hidden="true">
            {LOCK.join('\n')}
          </pre>
          <p className="tm-login__intro">
            <span className="tm-prompt">&gt;</span> authenticate to continue
            <span className="tm-cursor" />
          </p>

          <form className="tm-login__form" onSubmit={submit}>
            <Input
              label="operator id"
              prompt="login:~$"
              placeholder="enter handle"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              error={err}
            />
            <Input
              label="passphrase"
              prompt="passwd:~$"
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <div className="tm-login__row">
              <Checkbox
                checked={remember}
                onChange={setRemember}
                label="keep session alive"
              />
              <a href="#/login" className="tm-login__link">
                reset passphrase?
              </a>
            </div>
            <Button type="submit" variant="primary" block loading={busy}>
              {busy ? 'authenticating' : 'authenticate'}
            </Button>
          </form>

          <div className="tm-login__div" aria-hidden="true">
            <span>// new operator //</span>
          </div>
          <Button
            variant="dashed"
            block
            onClick={() =>
              push({
                tone: 'info',
                title: 'guest mode',
                message: 'read-only access enabled',
              })
            }
          >
            continue as guest
          </Button>

          <p className="tm-login__foot tm-dim">
            no credentials? <span className="tm-prompt">&gt;</span>{' '}
            ./request-access
          </p>
        </div>
      </div>
    </div>
  )
}
