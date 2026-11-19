import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';

function Routes() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* only logged in users can see the home page */}
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="index" />
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
      <Routes />
    </AuthProvider>
  );
}