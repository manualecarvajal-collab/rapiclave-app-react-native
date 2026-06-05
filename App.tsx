import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import VaultScreen from './src/screens/VaultScreen';
import SettingsScreen from './src/screens/SettingsScreen';

type Screen = 'login' | 'vault' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  if (currentScreen === 'login') {
    return (
      <SafeAreaProvider>
        <LoginScreen onUnlock={() => setCurrentScreen('vault')} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          {currentScreen === 'vault' && (
            <VaultScreen onLogout={() => setCurrentScreen('login')} />
          )}
          {currentScreen === 'settings' && (
            <SettingsScreen onLogout={() => setCurrentScreen('login')} />
          )}
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setCurrentScreen('vault')}
          >
            <Text
              style={[
                styles.tabIcon,
                currentScreen === 'vault' && styles.tabActive,
              ]}
            >
              ⌘
            </Text>
            <Text
              style={[
                styles.tabLabel,
                currentScreen === 'vault' && styles.tabActive,
              ]}
            >
              Vault
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setCurrentScreen('settings')}
          >
            <Text
              style={[
                styles.tabIcon,
                currentScreen === 'settings' && styles.tabActive,
              ]}
            >
              ⚙
            </Text>
            <Text
              style={[
                styles.tabLabel,
                currentScreen === 'settings' && styles.tabActive,
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#2d2d4a',
    paddingBottom: 24,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
    color: '#52525b',
  },
  tabLabel: {
    fontSize: 12,
    color: '#52525b',
    marginTop: 2,
  },
  tabActive: {
    color: '#7c3aed',
  },
});
