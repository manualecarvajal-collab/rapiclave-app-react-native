import { Fingerprint, Plus } from 'lucide-react'
import { useStore } from '../store'
import AddFingerprintSheet from '../components/AddFingerprintSheet'

export default function IdentityPage() {
  const { state, setSheet } = useStore()

  return (
    <div className="identity">
      <header className="identity-header">
        <h1 className="identity-title">Identidad</h1>
      </header>

      <div className="identity-content">
        <div className="identity-card">
          <div className="identity-card-icon">
            <Fingerprint size={40} />
          </div>
          <h2 className="identity-card-title">Biometría Passkey</h2>
          <p className="identity-card-subtitle">
            Huellas registradas para autenticación sin contraseña en tu
            bóveda.
          </p>
        </div>

        <section className="identity-section">
          <h3 className="identity-section-title">
            Huellas Registradas ({state.fingerprints.length})
          </h3>
          <div className="settings-group">
            {state.fingerprints.length === 0 ? (
              <div className="identity-empty">
                <p>No hay huellas registradas aún.</p>
              </div>
            ) : (
              state.fingerprints.map((fp) => (
                <div key={fp.id} className="settings-row">
                  <div className="identity-fp-icon">
                    <Fingerprint size={18} />
                  </div>
                  <div className="settings-row-text">
                    <span className="settings-row-label">{fp.name}</span>
                    <span className="settings-row-hint">
                      Registrada el {fp.createdAt}
                    </span>
                  </div>
                  <span className="badge badge-passkey" style={{ flexShrink: 0 }}>
                    Activa
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        <button className="identity-add-btn" onClick={() => setSheet({ name: 'add-fingerprint' })}>
          <Plus size={20} />
          Añadir Huella
        </button>
      </div>

      {state.sheet?.name === 'add-fingerprint' && (
        <AddFingerprintSheet onClose={() => setSheet(null)} />
      )}
    </div>
  )
}
