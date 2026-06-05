import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight } from '../theme/tokens';

export default function Banner() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Passkeys log you in 14x faster</Text>
        <Text style={styles.subtitle}>
          Upgrade your security with seamless, passwordless login across all
          devices.
        </Text>
      </View>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>🔒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    overflow: 'hidden',
  },
  content: {
    width: '70%',
  },
  title: {
    fontSize: fontSize.headline,
    fontWeight: fontWeight.headline,
    color: colors.onPrimaryContainer,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: fontSize.subheadline,
    fontWeight: fontWeight.subheadline,
    color: 'rgba(254,252,255,0.8)',
  },
  iconCircle: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
  },
});
