import { Fingerprint, Plus } from 'lucide-react'

interface RegisteredFingerprint {
  id: string
  name: string
  createdAt: string
}

const MOCK_FINGERPRINTS: RegisteredFingerprint[] = [
  { id: '1', name: 'Right Thumb', createdAt: '2026-04-12' },
  { id: '2', name: 'Left Index', createdAt: '2026-05-20' },
]

export default function IdentityPage() {
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
          <h3 className="identity-section-title">Registered Fingerprints</h3>
          <div className="settings-group">
            {MOCK_FINGERPRINTS.length === 0 ? (
              <div className="identity-empty">
                <p>No fingerprints registered yet.</p>
              </div>
            ) : (
              MOCK_FINGERPRINTS.map((fp) => (
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

        <button className="identity-add-btn">
          <Plus size={20} />
          Add Fingerprint
        </button>
      </div>
    </div>
  )
}
