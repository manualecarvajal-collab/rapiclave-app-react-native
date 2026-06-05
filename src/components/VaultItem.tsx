import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight } from '../theme/tokens';

interface VaultItemProps {
  title: string;
  subtitle: string;
  type: 'passkey' | 'password';
  icon: React.ReactNode;
  onPress?: () => void;
}

export default function VaultItem({
  title,
  subtitle,
  type,
  icon,
  onPress,
}: VaultItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.6}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.right}>
        {type === 'passkey' ? (
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>✓</Text>
            <Text style={styles.badgeText}>Passkey</Text>
          </View>
        ) : (
          <View style={styles.passwordBadge}>
            <Text style={styles.passwordBadgeText}>Password</Text>
          </View>
        )}
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bodyEmphasized,
    color: colors.onSurface,
  },
  subtitle: {
    fontSize: fontSize.footnote,
    color: colors.labelSecondary,
    marginTop: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: 'rgba(111,251,133,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0,115,42,0.3)',
  },
  badgeIcon: {
    fontSize: 10,
    color: colors.onSecondaryContainer,
  },
  badgeText: {
    fontSize: fontSize.caption,
    fontWeight: '500',
    color: colors.onSecondaryContainer,
  },
  passwordBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
  },
  passwordBadgeText: {
    fontSize: fontSize.caption,
    color: colors.onSurfaceVariant,
  },
  chevron: {
    fontSize: 22,
    color: colors.outline,
  },
});
