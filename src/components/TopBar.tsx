import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight } from '../theme/tokens';

interface TopBarProps {
  title: string;
  onAvatarPress?: () => void;
}

export default function TopBar({ title, onAvatarPress }: TopBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.icon}>⚡</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.avatar} onPress={onAvatarPress}>
        <Text style={styles.avatarIcon}>👤</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: 'rgba(250,249,254,0.8)',
  },
  left: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: colors.primary,
  },
  title: {
    fontSize: fontSize.largeTitleMobile,
    fontWeight: fontWeight.largeTitleMobile,
    color: colors.primary,
    letterSpacing: -0.5,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 18,
  },
});
