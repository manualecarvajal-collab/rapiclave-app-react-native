import { Fingerprint, Plus } from 'lucide-react'
import { useStore } from '../store'
import AddFingerprintSheet from '../components/AddFingerprintSheet'

export default function IdentityPage() {
  const { state, setSheet } = useStore()

  return (
    <div className="identity">
      <header className="identity-header">
        <h1 className="identity-title">Identity</h1>
      </header>

      <div className="identity-content">
        <div className="identity-card">
          <div className="identity-card-icon">
            <Fingerprint size={40} />
          </div>
          <h2 className="identity-card-title">Passkey Biometrics</h2>
          <p className="identity-card-subtitle">
            Registered fingerprints used for passwordless authentication across
            your vault.
          </p>
        </div>

        <section className="identity-section">
          <h3 className="identity-section-title">
            Registered Fingerprints ({state.fingerprints.length})
          </h3>
          <div className="settings-group">
            {state.fingerprints.length === 0 ? (
              <div className="identity-empty">
                <p>No fingerprints registered yet.</p>
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
                      Registered on {fp.createdAt}
                    </span>
                  </div>
                  <span className="badge badge-passkey" style={{ flexShrink: 0 }}>
                    Active
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        <button className="identity-add-btn" onClick={() => setSheet({ name: 'add-fingerprint' })}>
          <Plus size={20} />
          Add Fingerprint
        </button>
      </div>

      {state.sheet?.name === 'add-fingerprint' && (
        <AddFingerprintSheet onClose={() => setSheet(null)} />
      )}
    </div>
  )
}
