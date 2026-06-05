import { useState } from 'react'
import { ChevronRight, LogOut } from 'lucide-react'

interface SettingsPageProps {
  onLogout: () => void
}

export default function SettingsPage({ onLogout }: SettingsPageProps) {
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [travelMode, setTravelMode] = useState(false)

  return (
    <div className="settings">
      <header className="settings-header">
        <h1 className="settings-title">Settings</h1>
      </header>

      <div className="settings-content">
        <section className="settings-section">
          <h3 className="settings-section-title">Security</h3>

          <div className="settings-row">
            <span className="settings-row-label">Biometric Unlock</span>
            <button
              className={`toggle${biometricEnabled ? ' active' : ''}`}
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              role="switch"
              aria-checked={biometricEnabled}
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          <button className="settings-row settings-row-btn">
            <span className="settings-row-label">Change Master Password</span>
            <ChevronRight size={18} className="settings-chevron" />
          </button>

          <button className="settings-row settings-row-btn">
            <span className="settings-row-label">Account Recovery Key (ARK)</span>
            <ChevronRight size={18} className="settings-chevron" />
          </button>
        </section>

        <section className="settings-section">
          <h3 className="settings-section-title">Privacy</h3>

          <div className="settings-row">
            <div className="settings-row-text">
              <span className="settings-row-label">Travel Mode</span>
              <span className="settings-row-hint">
                Temporarily remove sensitive vaults from device
              </span>
            </div>
            <button
              className={`toggle${travelMode ? ' active' : ''}`}
              onClick={() => setTravelMode(!travelMode)}
              role="switch"
              aria-checked={travelMode}
            >
              <span className="toggle-thumb" />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3 className="settings-section-title">Data</h3>

          <button className="settings-row settings-row-btn">
            <span className="settings-row-label">Export Vault</span>
            <ChevronRight size={18} className="settings-chevron" />
          </button>

          <button className="settings-row settings-row-btn">
            <span className="settings-row-label">Import Vault</span>
            <ChevronRight size={18} className="settings-chevron" />
          </button>
        </section>

        <section className="settings-section">
          <h3 className="settings-section-title">About</h3>

          <div className="settings-row">
            <span className="settings-row-label">Version</span>
            <span className="settings-row-value">1.0.0</span>
          </div>
        </section>

        <button className="settings-lock" onClick={onLogout}>
          <LogOut size={18} />
          Lock Vault
        </button>
      </div>
    </div>
  )
}
