import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useNotes } from '../context/NotesContext';
import NoteCard from './NoteCard';
import Button from './Button';
import { colors } from '../theme';

type Props = { category?: string };

export default function NoteList({ category }: Props) {
  const router = useRouter();
  const { notes } = useNotes();

  const shown = category ? notes.filter((n) => n.category === category) : notes;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category ? `${category} notes` : 'All notes'}</Text>

      <Button title="Add note" onPress={() => router.push('/add-note')} />

      <FlatList
        style={styles.list}
        data={shown}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NoteCard note={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 8 },
  list: { marginTop: 16 },
  empty: { fontSize: 15, color: colors.grey },
});