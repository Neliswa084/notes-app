import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { NotesProvider } from '../context/NotesContext';

function Routes() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* only logged in users can see these pages */}
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-note" options={{ headerShown: true, title: 'Add note' }} />
      </Stack.Protected>

      {/* only logged out users can see login and register */}
      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NotesProvider>
        <Routes />
      </NotesProvider>
    </AuthProvider>
  );
}