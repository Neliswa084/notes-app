import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Input from './Input';
import Button from './Button';
import { colors } from '../theme';

export default function RegisterForm() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleRegister() {
    const message = await register(email, username, password);
    if (message) setError(message);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create an account to start taking notes</Text>

      <Input label="Username" value={username} onChangeText={setUsername} />
      <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Register" onPress={handleRegister} />

      <Link href="/login" style={styles.link}>
        Already have an account? Log in
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: colors.background },
  title: { fontSize: 26, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 15, color: colors.grey, marginTop: 4, marginBottom: 24 },
  error: { color: colors.red, marginBottom: 8 },
  link: { textAlign: 'center', marginTop: 20, color: colors.blue, fontSize: 15 },
});