import * as Keychain from 'react-native-keychain';
import { createMMKV } from 'react-native-mmkv';

const ENCRYPTION_KEY_ALIAS = 'com.rapiclave.app.mmkv.encryption-key';
const BIOMETRIC_KEY_ALIAS_PREFIX = 'com.rapiclave.app.keychain';

let encryptedStorage: ReturnType<typeof createMMKV> | null = null;

function getOrCreateEncryptedStorage() {
  if (!encryptedStorage) {
    throw new Error(
      'Encrypted MMKV not initialized. Call SecurityStorageService.initialize() first.',
    );
  }
  return encryptedStorage;
}

function generateSecureKey(): string {
  const crypto = require('crypto');
  const randomBytes = crypto.randomBytes(32);
  return randomBytes.toString('hex');
}

export const SecurityStorageService = {
  async initialize(): Promise<void> {
    if (encryptedStorage) {
      return;
    }

    const existing = await Keychain.getGenericPassword({
      service: ENCRYPTION_KEY_ALIAS,
    });

    let encryptionKey: string;

    if (existing) {
      encryptionKey = existing.password;
    } else {
      const newKey = generateSecureKey();
      await Keychain.setGenericPassword(
        ENCRYPTION_KEY_ALIAS,
        newKey,
        {
          service: ENCRYPTION_KEY_ALIAS,
          accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        },
      );
      encryptionKey = newKey;
    }

    encryptedStorage = createMMKV({
      id: 'com.rapiclave.app.vault',
      encryptionKey,
    });
  },

  async storeSensitiveToken(key: string, value: string): Promise<void> {
    const service = `${BIOMETRIC_KEY_ALIAS_PREFIX}.${key}`;
    await Keychain.setGenericPassword(key, value, {
      service,
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  },

  async getSensitiveToken(key: string): Promise<string | null> {
    const service = `${BIOMETRIC_KEY_ALIAS_PREFIX}.${key}`;
    const credentials = await Keychain.getGenericPassword({ service });
    return credentials ? credentials.password : null;
  },

  async resetSensitiveToken(key: string): Promise<void> {
    const service = `${BIOMETRIC_KEY_ALIAS_PREFIX}.${key}`;
    await Keychain.resetGenericPassword({ service });
  },

  storeVaultData(key: string, value: string): void {
    const store = getOrCreateEncryptedStorage();
    store.set(key, value);
  },

  getVaultData(key: string): string | undefined {
    const store = getOrCreateEncryptedStorage();
    return store.getString(key);
  },

  removeVaultData(key: string): void {
    const store = getOrCreateEncryptedStorage();
    store.remove(key);
  },

  clearAllVaultData(): void {
    const store = getOrCreateEncryptedStorage();
    store.clearAll();
  },
};
