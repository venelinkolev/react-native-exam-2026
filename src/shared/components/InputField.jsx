import { View, TextInput, Text, StyleSheet } from "react-native";

export default function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : styles.inputVerified]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 45,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  inputError: {
    borderColor: "red",
  },
  inputVerified: {
    borderColor: "green",
  },
  errorText: {
    position: "absolute",
    left: 0,
    top: "100%",
    color: "red",
    marginTop: 5,
    fontSize: 12,
  },
});
