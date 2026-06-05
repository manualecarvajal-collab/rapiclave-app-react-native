import { Key, Lock, FileArchive, X } from 'lucide-react'

interface BottomSheetProps {
  visible: boolean
  onClose: () => void
}

export default function BottomSheet({ visible, onClose }: BottomSheetProps) {
  if (!visible) return null

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-header">
          <h2 className="sheet-title">Add to Vault</h2>
          <button className="sheet-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="sheet-options">
          <button className="sheet-option">
            <div className="sheet-option-icon sheet-option-icon-primary">
              <Key size={20} />
            </div>
            <div className="sheet-option-text">
              <span className="sheet-option-title">Create Passkey (FIDO CXF)</span>
              <span className="sheet-option-subtitle">Secure, passwordless entry</span>
            </div>
            <ChevronRight size={20} />
          </button>
          <button className="sheet-option">
            <div className="sheet-option-icon">
              <Lock size={20} />
            </div>
            <div className="sheet-option-text">
              <span className="sheet-option-title">Add Password</span>
              <span className="sheet-option-subtitle">Traditional credential</span>
            </div>
            <ChevronRight size={20} />
          </button>
          <button className="sheet-option">
            <div className="sheet-option-icon">
              <FileArchive size={20} />
            </div>
            <div className="sheet-option-text">
              <span className="sheet-option-title">Import .kdbx</span>
              <span className="sheet-option-subtitle">Load offline database</span>
            </div>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

function ChevronRight({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: 'var(--color-text-tertiary)' }}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
