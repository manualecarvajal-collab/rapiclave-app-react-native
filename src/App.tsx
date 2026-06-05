import { useState } from 'react'
import { StoreProvider, useStore } from './store'
import LoginPage from './pages/LoginPage'
import VaultPage from './pages/VaultPage'
import IdentityPage from './pages/IdentityPage'
import SettingsPage from './pages/SettingsPage'
import BottomNav from './components/BottomNav'
import './App.css'

type Screen = 'login' | 'vault' | 'identity' | 'settings'

function AppShell() {
  const { state, setSheet } = useStore()
  const [screen, setScreen] = useState<Screen>('vault')
  const [tab, setTab] = useState('vault')

  const handleTabPress = (key: string) => {
    setTab(key)
    if (key === 'vault') setScreen('vault')
    else if (key === 'identity') setScreen('identity')
    else if (key === 'settings') setScreen('settings')
    setSheet(null)
  }

  if (screen === 'login') {
    return <LoginPage onUnlock={() => setScreen('vault')} />
  }

  return (
    <div className="app">
      <div className="app-content">
        {screen === 'vault' && <VaultPage />}
        {screen === 'identity' && <IdentityPage />}
        {screen === 'settings' && (
          <SettingsPage onLogout={() => setScreen('login')} />
        )}
      </div>
      <BottomNav active={tab} onTabPress={handleTabPress} />
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  )
}
