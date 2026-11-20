import { View, Text, StyleSheet } from 'react-native';
import { Note } from '../context/NotesContext';
import { colors } from '../theme';

export default function NoteCard({ note }: { note: Note }) {
  return (
    <View style={styles.card}>
      {note.title ? <Text style={styles.title}>{note.title}</Text> : null}
      <Text style={styles.text}>{note.text}</Text>
      <Text style={styles.small}>
        {note.category} · {new Date(note.dateAdded).toLocaleDateString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 4 },
  text: { fontSize: 15, color: colors.text },
  small: { fontSize: 12, color: colors.grey, marginTop: 8 },
});