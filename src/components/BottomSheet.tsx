import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../theme/tokens';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export default function BottomSheet({ visible, onClose }: BottomSheetProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>Add to Vault</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.options}>
          <TouchableOpacity style={styles.option} activeOpacity={0.6}>
            <View style={[styles.optionIcon, { backgroundColor: 'rgba(0,88,188,0.1)' }]}>
              <Text style={[styles.optionIconText, { color: colors.primary }]}>🔒</Text>
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Create Passkey (FIDO CXF)</Text>
              <Text style={styles.optionSubtitle}>Secure, passwordless entry</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} activeOpacity={0.6}>
            <View style={[styles.optionIcon, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Text style={styles.optionIconText}>🔑</Text>
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Add Password</Text>
              <Text style={styles.optionSubtitle}>Traditional credential</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} activeOpacity={0.6}>
            <View style={[styles.optionIcon, { backgroundColor: colors.surfaceContainerHigh }]}>
              <Text style={styles.optionIconText}>📁</Text>
            </View>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>Import .kdbx</Text>
              <Text style={styles.optionSubtitle}>Load offline database</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26,27,31,0.4)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: spacing.sheetPadding,
    paddingBottom: 40,
  },
  handle: {
    width: 48,
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: fontSize.largeTitleMobile,
    fontWeight: fontWeight.largeTitleMobile,
    color: colors.onSurface,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  options: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionIconText: {
    fontSize: 20,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bodyEmphasized,
    color: colors.onSurface,
  },
  optionSubtitle: {
    fontSize: fontSize.footnote,
    color: colors.labelSecondary,
    marginTop: 1,
  },
  chevron: {
    fontSize: 22,
    color: colors.outline,
  },
});
