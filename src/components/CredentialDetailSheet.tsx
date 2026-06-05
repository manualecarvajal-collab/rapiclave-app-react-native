import { useState } from 'react'
import { X, Eye, EyeOff, Copy, Trash2, Globe, Calendar, Key } from 'lucide-react'
import { useStore } from '../store'
import type { Credential } from '../types'

interface CredentialDetailSheetProps {
  credential: Credential
  onClose: () => void
}

export default function CredentialDetailSheet({ credential, onClose }: CredentialDetailSheetProps) {
  const { removeCredential, setSheet } = useStore()
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(null), 1800)
    } catch {}
  }

  const handleDelete = () => {
    if (confirm('¿Eliminar esta credencial?')) {
      removeCredential(credential.id)
      setSheet(null)
    }
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-header">
          <h2 className="sheet-title" style={{ fontSize: 22 }}>{credential.title}</h2>
          <button className="sheet-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="detail-card">
          <div className="detail-field">
            <span className="detail-label">Usuario / Email</span>
            <div className="detail-value-row">
              <span className="detail-value">{credential.username}</span>
              <button className="detail-copy" onClick={() => copyToClipboard(credential.username, 'username')}>
                {copied === 'username' ? <span style={{ color: 'var(--color-accent)', fontSize: 12, fontWeight: 600 }}>Copiado</span> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="detail-field">
            <span className="detail-label">Contraseña</span>
            <div className="detail-value-row">
              <span className="detail-value-mono">
                {showPassword ? credential.password : '\u2022'.repeat(credential.password.length)}
              </span>
              <div className="detail-actions">
                <button className="detail-icon-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button className="detail-icon-btn" onClick={() => copyToClipboard(credential.password, 'password')}>
                  {copied === 'password' ? <span style={{ color: 'var(--color-accent)', fontSize: 12, fontWeight: 600 }}>Copiado</span> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          <div className="detail-field">
            <span className="detail-label">Tipo</span>
            <div className="detail-value-row">
              <span className={`badge ${credential.type === 'passkey' ? 'badge-passkey' : 'badge-password'}`}>
                {credential.type === 'passkey' ? <><Key size={11} /> Passkey</> : 'Contraseña'}
              </span>
            </div>
          </div>

          {credential.uri && (
            <div className="detail-field">
              <span className="detail-label">Sitio Web</span>
              <div className="detail-value-row">
                <Globe size={14} style={{ color: 'var(--color-label-secondary)', flexShrink: 0 }} />
                <span className="detail-value">{credential.uri}</span>
              </div>
            </div>
          )}

          <div className="detail-field">
            <span className="detail-label">Creado</span>
            <div className="detail-value-row">
              <Calendar size={14} style={{ color: 'var(--color-label-secondary)', flexShrink: 0 }} />
              <span className="detail-value">{credential.createdAt}</span>
            </div>
          </div>
        </div>

        <button className="detail-delete" onClick={handleDelete}>
          <Trash2 size={16} />
          Eliminar Credencial
        </button>
      </div>
    </div>
  )
}
