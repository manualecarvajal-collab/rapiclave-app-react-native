import { useState } from 'react'
import { X, Fingerprint } from 'lucide-react'
import { useStore } from '../store'

interface AddFingerprintSheetProps {
  onClose: () => void
}

export default function AddFingerprintSheet({ onClose }: AddFingerprintSheetProps) {
  const { addFingerprint, setSheet } = useStore()
  const [name, setName] = useState('')
  const [step, setStep] = useState<'form' | 'scanning' | 'done'>('form')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return
    setStep('scanning')
    setTimeout(() => {
      addFingerprint(name)
      setStep('done')
    }, 1500)
  }

  if (step === 'done') {
    return (
      <div className="sheet-backdrop" onClick={onClose}>
        <div className="sheet" onClick={e => e.stopPropagation()}>
          <div className="sheet-handle" />
          <div className="sheet-header">
            <h2 className="sheet-title">Huella Registrada</h2>
            <button className="sheet-close" onClick={() => setSheet(null)}><X size={18} /></button>
          </div>
          <div className="sheet-success">
            <div className="sheet-success-icon"><Fingerprint size={32} /></div>
            <p className="sheet-success-text"><strong>{name}</strong> ha sido registrada para autenticación con Passkey.</p>
            <button className="sheet-submit" onClick={() => setSheet(null)}>Listo</button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'scanning') {
    return (
      <div className="sheet-backdrop" onClick={onClose}>
        <div className="sheet" onClick={e => e.stopPropagation()}>
          <div className="sheet-handle" />
          <div className="sheet-header">
            <h2 className="sheet-title">Escaneando Huella</h2>
          </div>
          <div className="sheet-loading">
            <Fingerprint size={48} style={{ color: 'var(--color-primary)', marginBottom: 16 }} />
            <p>Coloca tu dedo en el sensor para registrar <strong>{name}</strong>...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-header">
          <h2 className="sheet-title">Registrar Huella</h2>
          <button className="sheet-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form className="sheet-form" onSubmit={handleSubmit}>
          <div className="sheet-field">
            <label className="sheet-label">Nombre de la Huella</label>
            <input className="sheet-input" placeholder="ej. Pulgar Derecho" value={name} onChange={e => setName(e.target.value)} autoFocus />
          </div>
          <p className="sheet-hint">Se te pedirá escanear tu huella en el siguiente paso.</p>
          <button className="sheet-submit" type="submit" disabled={!name}>
            Iniciar Registro
          </button>
        </form>
      </div>
    </div>
  )
}
