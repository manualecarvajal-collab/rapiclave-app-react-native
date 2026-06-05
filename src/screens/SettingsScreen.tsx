import { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface SettingsScreenProps {
  onLogout: () => void;
}

export default function SettingsScreen({ onLogout }: SettingsScreenProps) {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [travelMode, setTravelMode] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Biometric Unlock</Text>
          <Switch
            value={biometricEnabled}
            onValueChange={setBiometricEnabled}
            trackColor={{ false: '#2d2d4a', true: '#7c3aed' }}
            thumbColor="#fff"
          />
        </View>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Change Master Password</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Account Recovery Key (ARK)</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowLabel}>Travel Mode</Text>
            <Text style={styles.rowHint}>
              Temporarily remove sensitive vaults from device
            </Text>
          </View>
          <Switch
            value={travelMode}
            onValueChange={setTravelMode}
            trackColor={{ false: '#2d2d4a', true: '#7c3aed' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Export Vault</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowLabel}>Import Vault</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Version</Text>
          <Text style={styles.rowValue}>1.0.0</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.lockButton} onPress={onLogout}>
        <Text style={styles.lockButtonText}>Lock Vault</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7c3aed',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  row: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    color: '#fff',
    fontSize: 15,
  },
  rowHint: {
    color: '#52525b',
    fontSize: 12,
    marginTop: 2,
  },
  rowValue: {
    color: '#a1a1aa',
    fontSize: 15,
  },
  chevron: {
    color: '#52525b',
    fontSize: 22,
  },
  lockButton: {
    backgroundColor: '#2d2d4a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  lockButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
