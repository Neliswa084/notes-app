import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

type Props = { category?: string };

export default function NoteList({ category }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category ? `${category} notes` : 'All notes'}</Text>
      <Text style={styles.empty}>No notes yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  empty: { fontSize: 15, color: colors.grey, marginTop: 8 },
});