import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Credential, Fingerprint, AppSettings, SheetView } from './types'

interface AppState {
  credentials: Credential[]
  fingerprints: Fingerprint[]
  settings: AppSettings
  sheet: SheetView
}

interface AppStore {
  state: AppState
  setSheet: (view: SheetView) => void
  addCredential: (c: Omit<Credential, 'id' | 'createdAt'>) => void
  removeCredential: (id: string) => void
  addFingerprint: (name: string) => void
  removeFingerprint: (id: string) => void
  updateSettings: (s: Partial<AppSettings>) => void
}

const DEFAULT_CREDENTIALS: Credential[] = [
  { id: '1', title: 'Google', username: 'user@gmail.com', password: 'p@ssw0rd123', type: 'passkey', createdAt: '2026-04-12' },
  { id: '2', title: 'Chase Bank', username: 'john.doe', password: 'bankP@ss!', type: 'passkey', createdAt: '2026-04-15' },
  { id: '3', title: 'Netflix', username: 'family@domain.com', password: 'netfl1x!', type: 'password', createdAt: '2026-05-01' },
  { id: '4', title: 'GitHub', username: 'dev@rapiclave.app', password: 'gh_p@ss!', type: 'password', createdAt: '2026-05-10' },
  { id: '5', title: 'AWS Console', username: 'admin@rapiclave.app', password: 'aws$ecure!', type: 'password', createdAt: '2026-05-20' },
]

const DEFAULT_FINGERPRINTS: Fingerprint[] = [
  { id: '1', name: 'Right Thumb', createdAt: '2026-04-12' },
  { id: '2', name: 'Left Index', createdAt: '2026-05-20' },
]

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`rapiclave:${key}`)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(`rapiclave:${key}`, JSON.stringify(value))
  } catch {}
}

const Ctx = createContext<AppStore | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<Credential[]>(() =>
    loadFromStorage('credentials', DEFAULT_CREDENTIALS)
  )
  const [fingerprints, setFingerprints] = useState<Fingerprint[]>(() =>
    loadFromStorage('fingerprints', DEFAULT_FINGERPRINTS)
  )
  const [settings, setSettings] = useState<AppSettings>(() =>
    loadFromStorage('settings', { biometricEnabled: true, travelMode: false })
  )
  const [sheet, setSheet] = useState<SheetView>(null)

  useEffect(() => { saveToStorage('credentials', credentials) }, [credentials])
  useEffect(() => { saveToStorage('fingerprints', fingerprints) }, [fingerprints])
  useEffect(() => { saveToStorage('settings', settings) }, [settings])

  const addCredential = useCallback((c: Omit<Credential, 'id' | 'createdAt'>) => {
    setCredentials(prev => [
      { ...c, id: crypto.randomUUID(), createdAt: new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
  }, [])

  const removeCredential = useCallback((id: string) => {
    setCredentials(prev => prev.filter(c => c.id !== id))
  }, [])

  const addFingerprint = useCallback((name: string) => {
    setFingerprints(prev => [
      { id: crypto.randomUUID(), name, createdAt: new Date().toISOString().slice(0, 10) },
      ...prev,
    ])
  }, [])

  const removeFingerprint = useCallback((id: string) => {
    setFingerprints(prev => prev.filter(f => f.id !== id))
  }, [])

  const updateSettings = useCallback((s: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...s }))
  }, [])

  return (
    <Ctx.Provider value={{
      state: { credentials, fingerprints, settings, sheet },
      setSheet,
      addCredential,
      removeCredential,
      addFingerprint,
      removeFingerprint,
      updateSettings,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export function useStore(): AppStore {
  const s = useContext(Ctx)
  if (!s) throw new Error('Missing StoreProvider')
  return s
}
