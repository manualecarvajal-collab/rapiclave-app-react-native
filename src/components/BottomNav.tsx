import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontSize } from '../theme/tokens';

interface Tab {
  key: string;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { key: 'vault', label: 'Vault', icon: '🔒' },
  { key: 'scan', label: 'Scan', icon: '📷' },
  { key: 'identity', label: 'Identity', icon: '🔑' },
  { key: 'settings', label: 'Settings', icon: '⚙️' },
];

interface BottomNavProps {
  active: string;
  onTabPress: (key: string) => void;
}

export default function BottomNav({ active, onTabPress }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabPress(tab.key)}
          >
            <View
              style={[
                styles.iconWrapper,
                isActive && styles.iconWrapperActive,
              ]}
            >
              <Text
                style={[
                  styles.icon,
                  isActive && { color: colors.primary },
                ]}
              >
                {tab.icon}
              </Text>
            </View>
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(250,249,254,0.9)',
    borderTopWidth: 0,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tabActive: {},
  iconWrapper: {
    width: 56,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconWrapperActive: {
    backgroundColor: 'rgba(0,88,188,0.15)',
  },
  icon: {
    fontSize: 22,
    color: colors.labelSecondary,
  },
  label: {
    fontSize: fontSize.caption,
    color: colors.labelSecondary,
  },
  labelActive: {
    fontWeight: '600',
    color: colors.primary,
  },
});
