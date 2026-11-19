import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../theme';

type Props = TextInputProps & { label: string };

export default function Input({ label, ...props }: Props) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.grey}
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginBottom: 14 },
  label: { fontSize: 14, color: colors.text, marginBottom: 6 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
});