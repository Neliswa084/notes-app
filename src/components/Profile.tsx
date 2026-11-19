import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { colors } from '../theme';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user?.username}</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '700', color: colors.text },
  email: { fontSize: 15, color: colors.grey, marginTop: 4, marginBottom: 20 },
});