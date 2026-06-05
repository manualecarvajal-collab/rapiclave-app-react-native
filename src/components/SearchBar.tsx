import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme/tokens';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search Vault...',
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.labelSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

import { Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: colors.outline,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: colors.onSurface,
    paddingVertical: 0,
  },
});
