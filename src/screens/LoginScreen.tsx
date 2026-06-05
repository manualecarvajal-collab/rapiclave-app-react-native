import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

interface LoginScreenProps {
  onUnlock: () => void;
}

export default function LoginScreen({ onUnlock }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false);

  const handleSubmit = () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your master password.');
      return;
    }
    onUnlock();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Rapiclave</Text>
        <Text style={styles.subtitle}>
          {isFirstTime
            ? 'Create your master password'
            : 'Enter your master password'}
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Master Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isFirstTime ? 'Create Vault' : 'Unlock'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsFirstTime(!isFirstTime)}>
          <Text style={styles.link}>
            {isFirstTime
              ? 'Already have a vault? Sign in'
              : 'First time? Create a master password'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Your data is encrypted end-to-end. Rapiclave never sees your master
          password.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 36,
    fontWeight: '700',
    color: '#7c3aed',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#a1a1aa',
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2d2d4a',
  },
  button: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#7c3aed',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 48,
  },
  footerText: {
    color: '#52525b',
    fontSize: 12,
    textAlign: 'center',
  },
});
