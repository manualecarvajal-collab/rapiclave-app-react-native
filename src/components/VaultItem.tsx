import { type LucideIcon, Lock, Key } from 'lucide-react'

interface VaultItemProps {
  title: string
  subtitle: string
  type: 'passkey' | 'password'
  icon: LucideIcon
  iconColor?: string
  onPress?: () => void
}

export default function VaultItem({
  title,
  subtitle,
  type,
  icon: Icon,
  iconColor,
  onPress,
}: VaultItemProps) {
  return (
    <button className="vault-item" onClick={onPress}>
      <div
        className="vault-item-icon"
        style={iconColor ? { color: iconColor } : undefined}
      >
        <Icon size={20} />
      </div>
      <div className="vault-item-text">
        <span className="vault-item-title">{title}</span>
        <span className="vault-item-subtitle">{subtitle}</span>
      </div>
      <div className="vault-item-right">
        {type === 'passkey' ? (
          <span className="badge badge-passkey">
            <Key size={11} />
            Passkey
          </span>
        ) : (
          <span className="badge badge-password">
            <Lock size={11} />
            Password
          </span>
        )}
        <ChevronRight size={18} className="vault-item-chevron" />
      </div>
    </button>
  )
}

function ChevronRight({ size, className }: { size: number; className?: string }) {
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
      className={className}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
