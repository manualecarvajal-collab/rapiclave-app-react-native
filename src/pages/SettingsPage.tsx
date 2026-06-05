import { ChevronRight, LogOut } from 'lucide-react'
import { useStore } from '../store'

interface SettingsPageProps {
  onLogout: () => void
}

export default function SettingsPage({ onLogout }: SettingsPageProps) {
  const { state, updateSettings } = useStore()

  return (
    <div className="settings">
      <header className="settings-header">
        <h1 className="settings-title">Ajustes</h1>
      </header>

      <div className="settings-content">
        <section className="settings-section">
          <h3 className="settings-section-title">Seguridad</h3>
          <div className="settings-group">
            <div className="settings-row">
              <span className="settings-row-label">Desbloqueo Biométrico</span>
              <button
                className={`toggle${state.settings.biometricEnabled ? ' active' : ''}`}
                onClick={() => updateSettings({ biometricEnabled: !state.settings.biometricEnabled })}
                role="switch"
                aria-checked={state.settings.biometricEnabled}
              >
                <span className="toggle-thumb" />
              </button>
            </div>

            <button className="settings-row-btn">
              <span className="settings-row-label">Cambiar Contraseña Maestra</span>
              <ChevronRight size={18} className="settings-chevron" />
            </button>

            <button className="settings-row-btn">
              <span className="settings-row-label">Clave de Recuperación (ARK)</span>
              <ChevronRight size={18} className="settings-chevron" />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3 className="settings-section-title">Privacidad</h3>
          <div className="settings-group">
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Modo Viaje</span>
                <span className="settings-row-hint">
                  Elimina temporalmente bóvedas sensibles del dispositivo
                </span>
              </div>
              <button
                className={`toggle${state.settings.travelMode ? ' active' : ''}`}
                onClick={() => updateSettings({ travelMode: !state.settings.travelMode })}
                role="switch"
                aria-checked={state.settings.travelMode}
              >
                <span className="toggle-thumb" />
              </button>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h3 className="settings-section-title">Datos</h3>
          <div className="settings-group">
            <button className="settings-row-btn">
              <span className="settings-row-label">Exportar Bóveda</span>
              <ChevronRight size={18} className="settings-chevron" />
            </button>

            <button className="settings-row-btn">
              <span className="settings-row-label">Importar Bóveda</span>
              <ChevronRight size={18} className="settings-chevron" />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3 className="settings-section-title">Acerca de</h3>
          <div className="settings-group">
            <div className="settings-row">
              <span className="settings-row-label">Versión</span>
              <span className="settings-row-value">1.0.0</span>
            </div>
          </div>
        </section>

        <button className="settings-lock" onClick={onLogout}>
          <LogOut size={18} />
          Cerrar Bóveda
        </button>
      </div>
    </div>
  )
}
