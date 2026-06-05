import { useState } from 'react'
import {
  Globe,
  Banknote,
  Film,
  Code2,
  Cloud,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import SearchBar from '../components/SearchBar'
import Banner from '../components/Banner'
import SegmentedControl from '../components/SegmentedControl'
import VaultItem from '../components/VaultItem'
import FAB from '../components/FAB'
import BottomSheet from '../components/BottomSheet'

interface Credential {
  id: string
  title: string
  subtitle: string
  type: 'passkey' | 'password'
}

const CREDENTIALS: Credential[] = [
  { id: '1', title: 'Google', subtitle: 'user@gmail.com', type: 'passkey' },
  { id: '2', title: 'Chase Bank', subtitle: '\u2022\u2022\u2022\u2022 4321', type: 'passkey' },
  { id: '3', title: 'Netflix', subtitle: 'family@domain.com', type: 'password' },
  { id: '4', title: 'GitHub', subtitle: 'dev@rapiclave.app', type: 'password' },
  { id: '5', title: 'AWS Console', subtitle: 'admin@rapiclave.app', type: 'password' },
]

function getIcon(title: string) {
  switch (title) {
    case 'Google': return Globe
    case 'Chase Bank': return Banknote
    case 'Netflix': return Film
    case 'GitHub': return Code2
    case 'AWS Console': return Cloud
    default: return Globe
  }
}

function getIconColor(title: string) {
  switch (title) {
    case 'Netflix': return '#E50914'
    case 'AWS Console': return '#FF9900'
    default: return undefined
  }
}

export default function VaultPage() {
  const [search, setSearch] = useState('')
  const [segment, setSegment] = useState('all')
  const [sheetVisible, setSheetVisible] = useState(false)

  const filtered = CREDENTIALS.filter((c) => {
    if (segment === 'passkeys' && c.type !== 'passkey') return false
    if (segment === 'passwords' && c.type !== 'password') return false
    if (search) {
      const q = search.toLowerCase()
      return c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="vault">
      <TopBar title="Identity Orchestrator" />

      <div className="vault-list">
        <div className="vault-list-header">
          <SearchBar value={search} onChangeText={setSearch} />
          <Banner />
          <SegmentedControl selected={segment} onSelect={setSegment} />
          <h2 className="vault-section-title">Credentials</h2>
        </div>

        <div className="vault-group">
          {filtered.map((item) => (
            <div key={item.id} className="vault-item-wrap">
              <VaultItem
                title={item.title}
                subtitle={item.subtitle}
                type={item.type}
                icon={getIcon(item.title)}
                iconColor={getIconColor(item.title)}
              />
            </div>
          ))}
        </div>
      </div>

      <FAB onPress={() => setSheetVisible(true)} />

      <BottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
      />
    </div>
  )
}
