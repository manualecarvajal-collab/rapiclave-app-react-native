import { Fingerprint } from 'lucide-react'

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <h3 className="banner-title">Passkeys log you in 14× faster</h3>
        <p className="banner-subtitle">
          Upgrade your security with seamless, passwordless login across all devices.
        </p>
      </div>
      <div className="banner-icon">
        <Fingerprint size={28} />
      </div>
    </div>
  )
}
