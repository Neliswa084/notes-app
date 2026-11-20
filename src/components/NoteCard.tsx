import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Note, useNotes } from '../context/NotesContext';
import { colors } from '../theme';

export default function NoteCard({ note }: { note: Note }) {
  const router = useRouter();
  const { deleteNote } = useNotes();
  const [confirming, setConfirming] = useState(false);

  return (
    <View style={styles.card}>
      {note.title ? <Text style={styles.title}>{note.title}</Text> : null}
      <Text style={styles.text}>{note.text}</Text>

      <Text style={styles.small}>
        {note.category} · Added {new Date(note.dateAdded).toLocaleDateString()}
      </Text>
      {note.dateEdited ? (
        <Text style={styles.small}>Edited {new Date(note.dateEdited).toLocaleString()}</Text>
      ) : null}

      {confirming ? (
        <View style={styles.row}>
          <Text style={styles.question}>Delete this note?</Text>
          <Pressable style={[styles.button, styles.red]} onPress={() => deleteNote(note.id)}>
            <Text style={styles.whiteText}>Yes</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setConfirming(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.row}>
          <Pressable
            style={styles.button}
            onPress={() => router.push({ pathname: '/edit-note', params: { id: note.id } })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.redOutline]} onPress={() => setConfirming(true)}>
            <Text style={styles.redText}>Delete</Text>
          </Pressable>
        </View>
      )}
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
  small: { fontSize: 12, color: colors.grey, marginTop: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  question: { fontSize: 14, color: colors.text, marginRight: 4 },
  button: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  buttonText: { fontSize: 14, color: colors.text },
  redOutline: { borderColor: colors.red },
  redText: { fontSize: 14, color: colors.red },
  red: { backgroundColor: colors.red, borderColor: colors.red },
  whiteText: { fontSize: 14, color: '#fff' },
});