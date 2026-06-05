import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DashboardScreen from './src/screens/DashboardScreen';
import LoginScreen from './src/screens/LoginScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BottomNav from './src/components/BottomNav';
import { colors } from './src/theme/tokens';

type Screen = 'login' | 'vault' | 'settings' | 'scan' | 'identity';

export default function App() {
  const [screen, setScreen] = useState<Screen>('vault');
  const [tab, setTab] = useState('vault');

  const handleTabPress = (key: string) => {
    setTab(key);
    if (key === 'settings') setScreen('settings');
    else setScreen('vault');
  };

  if (screen === 'login') {
    return (
      <SafeAreaProvider>
        <LoginScreen onUnlock={() => setScreen('vault')} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.content}>
          {screen === 'vault' && <DashboardScreen />}
          {screen === 'settings' && (
            <SettingsScreen onLogout={() => setScreen('login')} />
          )}
        </View>
        <BottomNav active={tab} onTabPress={handleTabPress} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
