import { useState } from 'react'
import { Key, Lock, FileArchive, X, ArrowLeft, Globe, Eye, EyeOff } from 'lucide-react'
import { useStore } from '../store'
import type { SheetView } from '../types'

function ChevronRight({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-separator)' }}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function AddPasswordForm({ onBack }: { onBack: () => void }) {
  const { addCredential, setSheet } = useStore()
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [uri, setUri] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !username || !password) return
    addCredential({ title, username, password, uri: uri || undefined, type: 'password' })
    setSheet(null)
  }

  const isValid = title && username && password

  return (
    <>
      <div className="sheet-handle" />
      <div className="sheet-header">
        <button className="sheet-back" onClick={onBack}><ArrowLeft size={20} /></button>
        <h2 className="sheet-title">Añadir Contraseña</h2>
        <div style={{ width: 30 }} />
      </div>
      <form className="sheet-form" onSubmit={handleSubmit}>
        <div className="sheet-field">
          <label className="sheet-label">Título</label>
          <input className="sheet-input" placeholder="ej. Mi Cuenta" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
        </div>
        <div className="sheet-field">
          <label className="sheet-label">Usuario / Email</label>
          <input className="sheet-input" placeholder="usuario@ejemplo.com" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="sheet-field">
          <label className="sheet-label">Contraseña</label>
          <div className="sheet-input-wrap">
            <input className="sheet-input sheet-input-inline" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" className="sheet-input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div className="sheet-field">
          <label className="sheet-label">Sitio Web (opcional)</label>
          <div className="sheet-input-wrap">
            <Globe size={16} style={{ color: 'var(--color-label-secondary)', flexShrink: 0 }} />
            <input className="sheet-input sheet-input-inline" placeholder="https://ejemplo.com" value={uri} onChange={e => setUri(e.target.value)} />
          </div>
        </div>
        <button className="sheet-submit" type="submit" disabled={!isValid}>
          Guardar Contraseña
        </button>
      </form>
    </>
  )
}

function AddPasskeyForm({ onBack }: { onBack: () => void }) {
  const { addCredential, setSheet } = useStore()
  const [step, setStep] = useState<'create' | 'saving' | 'done'>('create')
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !username) return
    setStep('saving')
    setTimeout(() => {
      addCredential({ title, username, password: crypto.randomUUID(), type: 'passkey' })
      setStep('done')
    }, 1200)
  }

  if (step === 'done') {
    return (
      <>
        <div className="sheet-handle" />
        <div className="sheet-header">
          <h2 className="sheet-title">Passkey Creada</h2>
          <button className="sheet-close" onClick={() => setSheet(null)}><X size={18} /></button>
        </div>
        <div className="sheet-success">
          <div className="sheet-success-icon"><Key size={32} /></div>
          <p className="sheet-success-text">Passkey para <strong>{title}</strong> guardada en tu bóveda.</p>
          <button className="sheet-submit" onClick={() => setSheet(null)}>Listo</button>
        </div>
      </>
    )
  }

  if (step === 'saving') {
    return (
      <>
        <div className="sheet-handle" />
        <div className="sheet-header">
          <h2 className="sheet-title">Creando Passkey</h2>
        </div>
        <div className="sheet-loading">
          <div className="sheet-spinner" />
          <p>Generando credencial FIDO CXF de forma segura...</p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="sheet-handle" />
      <div className="sheet-header">
        <button className="sheet-back" onClick={onBack}><ArrowLeft size={20} /></button>
        <h2 className="sheet-title">Crear Passkey</h2>
        <div style={{ width: 30 }} />
      </div>
      <form className="sheet-form" onSubmit={handleCreate}>
        <div className="sheet-field">
          <label className="sheet-label">Servicio / App</label>
          <input className="sheet-input" placeholder="ej. Google" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
        </div>
        <div className="sheet-field">
          <label className="sheet-label">Usuario / Email</label>
          <input className="sheet-input" placeholder="usuario@ejemplo.com" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="sheet-note">
          <Key size={14} />
          <span>Una passkey usa biometría o el PIN del dispositivo para autenticación. No necesita contraseña.</span>
        </div>
        <button className="sheet-submit" type="submit" disabled={!title || !username}>
          Crear Passkey
        </button>
      </form>
    </>
  )
}

function ImportKdbxForm({ onBack }: { onBack: () => void }) {
  const { setSheet } = useStore()
  const [selected, setSelected] = useState(false)

  return (
    <>
      <div className="sheet-handle" />
      <div className="sheet-header">
        <button className="sheet-back" onClick={onBack}><ArrowLeft size={20} /></button>
        <h2 className="sheet-title">Importar .kdbx</h2>
        <div style={{ width: 30 }} />
      </div>
      <div className="sheet-form">
        <div className="sheet-import-area" onClick={() => setSelected(true)}>
          <FileArchive size={32} />
          <p>{selected ? 'database.kdbx seleccionado' : 'Toca para seleccionar un archivo KeePass'}</p>
        </div>
        <div className="sheet-field">
          <label className="sheet-label">Contraseña de la Base de Datos</label>
          <input className="sheet-input" type="password" placeholder="Ingresa la contraseña .kdbx" />
        </div>
        <button className="sheet-submit" disabled={!selected} onClick={() => setSheet(null)}>
          Importar
        </button>
      </div>
    </>
  )
}

interface AddCredentialSheetProps {
  view: Extract<SheetView, { name: 'add-menu' | 'add-password' | 'add-passkey' | 'import-kdbx' }>
  onClose: () => void
}

export default function AddCredentialSheet({ view, onClose }: AddCredentialSheetProps) {
  const { setSheet } = useStore()

  const handleBack = () => setSheet({ name: 'add-menu' })

  const content = (() => {
    switch (view.name) {
      case 'add-password':
        return <AddPasswordForm onBack={handleBack} />
      case 'add-passkey':
        return <AddPasskeyForm onBack={handleBack} />
      case 'import-kdbx':
        return <ImportKdbxForm onBack={handleBack} />
      default:
        return (
          <>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Añadir a la Bóveda</h2>
              <button className="sheet-close" onClick={onClose}><X size={18} /></button>
            </div>
            <div className="sheet-options">
              <button className="sheet-option" onClick={() => setSheet({ name: 'add-passkey' })}>
                <div className="sheet-option-icon sheet-option-icon-primary"><Key size={20} /></div>
                <div className="sheet-option-text">
                  <span className="sheet-option-title">Crear Passkey (FIDO CXF)</span>
                  <span className="sheet-option-subtitle">Entrada segura sin contraseña</span>
                </div>
                <ChevronRight size={20} />
              </button>
              <button className="sheet-option" onClick={() => setSheet({ name: 'add-password' })}>
                <div className="sheet-option-icon"><Lock size={20} /></div>
                <div className="sheet-option-text">
                  <span className="sheet-option-title">Añadir Contraseña</span>
                  <span className="sheet-option-subtitle">Credencial tradicional</span>
                </div>
                <ChevronRight size={20} />
              </button>
              <button className="sheet-option" onClick={() => setSheet({ name: 'import-kdbx' })}>
                <div className="sheet-option-icon"><FileArchive size={20} /></div>
                <div className="sheet-option-text">
                  <span className="sheet-option-title">Importar .kdbx</span>
                  <span className="sheet-option-subtitle">Cargar base de datos offline</span>
                </div>
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )
    }
  })()

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        {content}
      </div>
    </div>
  )
}
