import { type LucideIcon, LockKeyhole, Fingerprint, Settings } from 'lucide-react'

interface Tab {
  key: string
  label: string
  icon: LucideIcon
}

const TABS: Tab[] = [
  { key: 'vault', label: 'Vault', icon: LockKeyhole },
  { key: 'identity', label: 'Identity', icon: Fingerprint },
  { key: 'settings', label: 'Settings', icon: Settings },
]

interface BottomNavProps {
  active: string
  onTabPress: (key: string) => void
}

export default function BottomNav({ active, onTabPress }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => {
        const isActive = tab.key === active
        const Icon = tab.icon
        return (
          <button
            key={tab.key}
            className={`bottom-nav-tab${isActive ? ' active' : ''}`}
            onClick={() => onTabPress(tab.key)}
          >
            <Icon size={22} />
            <span className="bottom-nav-label">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
