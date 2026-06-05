import { useState } from 'react'
import {
  Globe, Banknote, Film, Code2, Cloud,
} from 'lucide-react'
import { useStore } from '../store'
import TopBar from '../components/TopBar'
import SearchBar from '../components/SearchBar'
import Banner from '../components/Banner'
import SegmentedControl from '../components/SegmentedControl'
import VaultItem from '../components/VaultItem'
import FAB from '../components/FAB'
import AddCredentialSheet from '../components/AddCredentialSheet'
import CredentialDetailSheet from '../components/CredentialDetailSheet'
import type { Credential } from '../types'

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
  const { state, setSheet } = useStore()
  const [search, setSearch] = useState('')
  const [segment, setSegment] = useState('all')
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null)

  const filtered = state.credentials.filter((c) => {
    if (segment === 'passkeys' && c.type !== 'passkey') return false
    if (segment === 'passwords' && c.type !== 'password') return false
    if (search) {
      const q = search.toLowerCase()
      return c.title.toLowerCase().includes(q) || c.username.toLowerCase().includes(q)
    }
    return true
  })

  const addSheet = state.sheet && ['add-menu', 'add-password', 'add-passkey', 'import-kdbx'].includes(state.sheet.name)
    ? state.sheet as Extract<typeof state.sheet, { name: 'add-menu' | 'add-password' | 'add-passkey' | 'import-kdbx' }>
    : null

  return (
    <div className="vault">
      <TopBar title="Rapiclave" />

      <div className="vault-list">
        <div className="vault-list-header">
          <SearchBar value={search} onChangeText={setSearch} />
          <Banner />
          <SegmentedControl selected={segment} onSelect={setSegment} />
          <h2 className="vault-section-title">Credenciales {filtered.length > 0 && `(${filtered.length})`}</h2>
        </div>

        {filtered.length === 0 ? (
          <div className="vault-empty">
            <p>No se encontraron credenciales</p>
          </div>
        ) : (
          <div className="vault-group">
            {filtered.map((item) => (
              <div key={item.id} className="vault-item-wrap">
                <VaultItem
                  title={item.title}
                  subtitle={item.username}
                  type={item.type}
                  icon={getIcon(item.title)}
                  iconColor={getIconColor(item.title)}
                  onPress={() => setSelectedCred(item)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <FAB onPress={() => setSheet({ name: 'add-menu' })} />

      {addSheet && (
        <AddCredentialSheet view={addSheet} onClose={() => setSheet(null)} />
      )}

      {selectedCred && (
        <CredentialDetailSheet
          credential={selectedCred}
          onClose={() => setSelectedCred(null)}
        />
      )}
    </div>
  )
}
