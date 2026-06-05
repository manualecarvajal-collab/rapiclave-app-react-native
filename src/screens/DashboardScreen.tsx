import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors } from '../theme/tokens';
import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import Banner from '../components/Banner';
import SegmentedControl from '../components/SegmentedControl';
import VaultItem from '../components/VaultItem';
import FAB from '../components/FAB';
import BottomSheet from '../components/BottomSheet';

interface Credential {
  id: string;
  title: string;
  subtitle: string;
  type: 'passkey' | 'password';
  icon: React.ReactNode;
}

const CREDENTIALS: Credential[] = [
  {
    id: '1',
    title: 'Google',
    subtitle: 'user@gmail.com',
    type: 'passkey',
    icon: <Text style={{ fontSize: 20, color: colors.primary }}>G</Text>,
  },
  {
    id: '2',
    title: 'Chase Bank',
    subtitle: '•••• 4321',
    type: 'passkey',
    icon: <Text style={{ fontSize: 20, color: colors.primary }}>🏦</Text>,
  },
  {
    id: '3',
    title: 'Netflix',
    subtitle: 'family@domain.com',
    type: 'password',
    icon: (
      <Text style={{ fontSize: 16, fontWeight: '700', color: '#E50914' }}>
        N
      </Text>
    ),
  },
  {
    id: '4',
    title: 'GitHub',
    subtitle: 'dev@rapiclave.app',
    type: 'password',
    icon: <Text style={{ fontSize: 20, color: colors.onSurfaceVariant }}>⌘</Text>,
  },
  {
    id: '5',
    title: 'AWS Console',
    subtitle: 'admin@rapiclave.app',
    type: 'password',
    icon: <Text style={{ fontSize: 18, color: '#FF9900' }}>☁</Text>,
  },
];

export default function DashboardScreen() {
  const [search, setSearch] = useState('');
  const [segment, setSegment] = useState('all');
  const [sheetVisible, setSheetVisible] = useState(false);

  const filtered = CREDENTIALS.filter((c) => {
    if (segment === 'passkeys' && c.type !== 'passkey') return false;
    if (segment === 'passwords' && c.type !== 'password') return false;
    if (search) {
      const q = search.toLowerCase();
      return c.title.toLowerCase().includes(q) || c.subtitle.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <TopBar title="Identity Orchestrator" />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <SearchBar value={search} onChangeText={setSearch} />
            <Banner />
            <SegmentedControl selected={segment} onSelect={setSegment} />
            <Text style={styles.sectionTitle}>Credentials</Text>
          </View>
        }
        renderItem={({ item }) => (
          <VaultItem
            title={item.title}
            subtitle={item.subtitle}
            type={item.type}
            icon={item.icon}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      <FAB onPress={() => setSheetVisible(true)} />

      <BottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerContent: {
    gap: 12,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.onSurface,
    marginTop: 4,
  },
  separator: {
    height: 0,
    backgroundColor: colors.surfaceContainerHighest,
    marginLeft: 72,
  },
});
