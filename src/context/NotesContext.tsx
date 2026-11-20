import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

export const categories = ['Work', 'Study', 'Personal'];

export type Note = {
  id: string;
  title: string;
  text: string;
  category: string;
  dateAdded: string;
  dateEdited?: string;
};

type NotesType = {
  notes: Note[];
  addNote: (title: string, text: string, category: string) => Promise<void>;
  editNote: (id: string, title: string, text: string, category: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

const NotesContext = createContext<NotesType>({} as NotesType);
export const useNotes = () => useContext(NotesContext);

export function NotesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  // load the notes of the logged in user
  useEffect(() => {
    async function loadNotes() {
      if (!user) {
        setNotes([]);
        return;
      }
      const saved = await AsyncStorage.getItem('notes_' + user.id);
      setNotes(saved ? JSON.parse(saved) : []);
    }
    loadNotes();
  }, [user]);

  // saves the list in state and in AsyncStorage
  async function saveNotes(list: Note[]) {
    setNotes(list);
    if (user) await AsyncStorage.setItem('notes_' + user.id, JSON.stringify(list));
  }

  async function addNote(title: string, text: string, category: string) {
    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      text: text.trim(),
      category,
      dateAdded: new Date().toISOString(),
    };
    await saveNotes([newNote, ...notes]);
  }

  // changes one note and saves the time it was edited
  async function editNote(id: string, title: string, text: string, category: string) {
    const updated = notes.map((n) =>
      n.id === id
        ? { ...n, title: title.trim(), text: text.trim(), category, dateEdited: new Date().toISOString() }
        : n
    );
    await saveNotes(updated);
  }

  // keeps every note except the one with this id
  async function deleteNote(id: string) {
    await saveNotes(notes.filter((n) => n.id !== id));
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}