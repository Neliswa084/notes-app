import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

type Props = { title: string; onPress: () => void; red?: boolean };

export default function Button({ title, onPress, red }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: red ? colors.red : colors.blue }]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 6 },
  text: { color: '#fff', fontSize: 16, fontWeight: '600' },
});