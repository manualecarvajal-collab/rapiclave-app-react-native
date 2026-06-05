import { Fingerprint } from 'lucide-react'

export default function Banner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <h3 className="banner-title">Las Passkeys te autentican 14× más rápido</h3>
        <p className="banner-subtitle">
          Mejora tu seguridad con inicio de sesión sin contraseña en todos tus
          dispositivos.
        </p>
      </div>
      <div className="banner-icon">
        <Fingerprint size={28} />
      </div>
    </div>
  )
}
