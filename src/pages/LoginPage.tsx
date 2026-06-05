import { useState } from 'react'
import { Shield } from 'lucide-react'

interface LoginPageProps {
  onUnlock: () => void
}

export default function LoginPage({ onUnlock }: LoginPageProps) {
  const [password, setPassword] = useState('')
  const [isFirstTime, setIsFirstTime] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return
    onUnlock()
  }

  return (
    <div className="login">
      <div className="login-header">
        <Shield size={40} className="login-logo" />
        <h1 className="login-title">Rapiclave</h1>
        <p className="login-subtitle">
          {isFirstTime
            ? 'Create your master password'
            : 'Enter your master password'}
        </p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="password"
            placeholder="Master Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>

        <button className="login-btn" type="submit">
          {isFirstTime ? 'Create Vault' : 'Unlock'}
        </button>

        <button
          type="button"
          className="login-link"
          onClick={() => setIsFirstTime(!isFirstTime)}
        >
          {isFirstTime
            ? 'Already have a vault? Sign in'
            : 'First time? Create a master password'}
        </button>
      </form>

      <p className="login-footer">
        Your data is encrypted end-to-end. Rapiclave never sees your master password.
      </p>
    </div>
  )
}
