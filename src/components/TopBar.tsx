import { Shield } from 'lucide-react'

interface TopBarProps {
  title: string
  onAvatarPress?: () => void
}

export default function TopBar({ title, onAvatarPress }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <Shield size={22} className="topbar-icon" />
      </div>
      <h1 className="topbar-title">{title}</h1>
      <button className="topbar-avatar" onClick={onAvatarPress}>
        <span className="topbar-avatar-text">MC</span>
      </button>
    </header>
  )
}
