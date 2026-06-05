import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Credential {
  id: string;
  service: string;
  username: string;
  uri: string;
}

const MOCK_CREDENTIALS: Credential[] = [
  { id: '1', service: 'GitHub', username: 'user@example.com', uri: 'github.com' },
  { id: '2', service: 'Google', username: 'user@gmail.com', uri: 'google.com' },
  { id: '3', service: 'AWS', username: 'admin@company.com', uri: 'aws.amazon.com' },
];

interface VaultScreenProps {
  onLogout: () => void;
}

export default function VaultScreen({ onLogout }: VaultScreenProps) {
  const [search, setSearch] = useState('');

  const filtered = MOCK_CREDENTIALS.filter(
    (c) =>
      c.service.toLowerCase().includes(search.toLowerCase()) ||
      c.uri.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }: { item: Credential }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.service[0]}</Text>
        </View>
        <View>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.uri}>{item.uri}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.copyButton}>
        <Text style={styles.copyText}>Copy</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vault</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logout}>Lock</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search credentials..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No credentials found</Text>
        }
      />

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  logout: {
    color: '#7c3aed',
    fontSize: 16,
    fontWeight: '600',
  },
  search: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2d2d4a',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#2d2d4a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#7c3aed',
    fontSize: 18,
    fontWeight: '700',
  },
  serviceName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    color: '#a1a1aa',
    fontSize: 13,
    marginTop: 2,
  },
  uri: {
    color: '#52525b',
    fontSize: 11,
    marginTop: 1,
  },
  copyButton: {
    backgroundColor: '#2d2d4a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  copyText: {
    color: '#7c3aed',
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7c3aed',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 30,
  },
  empty: {
    color: '#52525b',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});
