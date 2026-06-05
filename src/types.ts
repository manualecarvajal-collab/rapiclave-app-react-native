export interface Credential {
  id: string
  title: string
  username: string
  password: string
  uri?: string
  type: 'passkey' | 'password'
  createdAt: string
}

export interface Fingerprint {
  id: string
  name: string
  createdAt: string
}

export interface AppSettings {
  biometricEnabled: boolean
  travelMode: boolean
}

export type SheetView =
  | { name: 'add-menu' }
  | { name: 'add-password' }
  | { name: 'add-passkey' }
  | { name: 'import-kdbx' }
  | { name: 'add-fingerprint' }
  | { name: 'credential-detail'; credentialId: string }
  | null
