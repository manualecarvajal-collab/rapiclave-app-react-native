import { useState } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'

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
            ? 'Crea tu contraseña maestra'
            : 'Ingresa tu contraseña maestra'}
        </p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="password"
            placeholder="Contraseña Maestra"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </div>

        {isFirstTime && (
          <div className="login-disclaimer">
            <AlertTriangle size={16} />
            <p>
              Esta contraseña <strong>no puede ser recuperada</strong> si la olvidas.
              No existe un "olvidé mi contraseña". RapiClave no tiene acceso a ella.
              Guárdala en un lugar seguro o usa un gestor de contraseñas.
            </p>
          </div>
        )}

        <button className="login-btn" type="submit">
          {isFirstTime ? 'Crear Bóveda' : 'Desbloquear'}
        </button>

        <button
          type="button"
          className="login-link"
          onClick={() => setIsFirstTime(!isFirstTime)}
        >
          {isFirstTime
            ? '¿Ya tienes una bóveda? Inicia sesión'
            : '¿Primera vez? Crea una contraseña maestra'}
        </button>
      </form>

      <p className="login-footer">
        Tus datos están cifrados de extremo a extremo. RapiClave nunca ve tu
        contraseña maestra.
      </p>
    </div>
  )
}
