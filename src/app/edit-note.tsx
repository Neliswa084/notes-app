import { useLocalSearchParams } from 'expo-router';
import { useNotes } from '../context/NotesContext';
import NoteForm from '../components/NoteForm';

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { notes } = useNotes();
  const note = notes.find((n) => n.id === id);

  if (!note) return null;

  return <NoteForm note={note} />;
}