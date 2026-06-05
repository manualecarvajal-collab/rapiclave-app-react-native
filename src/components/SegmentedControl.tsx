import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, fontSize, fontWeight } from '../theme/tokens';

interface Segment {
  key: string;
  label: string;
}

const SEGMENTS: Segment[] = [
  { key: 'all', label: 'All' },
  { key: 'passkeys', label: 'Passkeys' },
  { key: 'passwords', label: 'Passwords' },
  { key: 'offline', label: 'Offline/KDBX' },
];

interface SegmentedControlProps {
  selected: string;
  onSelect: (key: string) => void;
}

export default function SegmentedControl({
  selected,
  onSelect,
}: SegmentedControlProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {SEGMENTS.map((seg) => {
          const isActive = seg.key === selected;
          return (
            <TouchableOpacity
              key={seg.key}
              style={[styles.segment, isActive && styles.segmentActive]}
              onPress={() => onSelect(seg.key)}
            >
              <Text
                style={[
                  styles.segmentText,
                  isActive && styles.segmentTextActive,
                ]}
              >
                {seg.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 8,
    padding: 4,
  },
  scroll: {
    flexDirection: 'row',
    gap: 4,
  },
  segment: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  segmentActive: {
    backgroundColor: colors.systemBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: fontSize.body,
    color: colors.labelSecondary,
  },
  segmentTextActive: {
    fontWeight: fontWeight.bodyEmphasized,
    color: colors.onSurface,
  },
});
