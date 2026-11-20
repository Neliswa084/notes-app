import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useNotes, categories } from '../context/NotesContext';
import Input from './Input';
import Button from './Button';
import { colors } from '../theme';

export default function NoteForm() {
  const router = useRouter();
  const { addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Work');
  const [error, setError] = useState('');

  async function handleSave() {
    if (!text.trim()) {
      setError('Write something in the note first.');
      return;
    }
    await addNote(title, text, category);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Input label="Title (optional)" value={title} onChangeText={setTitle} autoCapitalize="sentences" />

      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {categories.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCategory(c)}
            style={[styles.chip, category === c && styles.chipActive]}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Input
        label="Note"
        value={text}
        onChangeText={setText}
        multiline
        autoCapitalize="sentences"
        style={styles.noteBox}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Save note" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  label: { fontSize: 14, color: colors.text, marginBottom: 6 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipActive: { backgroundColor: colors.main, borderColor: colors.main },
  chipText: { fontSize: 14, color: colors.text },
  chipTextActive: { color: '#fff' },
  noteBox: { height: 140, textAlignVertical: 'top' },
  error: { color: colors.red, marginBottom: 8 },
});