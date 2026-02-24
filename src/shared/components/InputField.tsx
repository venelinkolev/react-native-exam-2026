import { forwardRef } from "react";
import { View, TextInput, Text, StyleSheet, KeyboardTypeOptions } from "react-native";

type InputFieldProps = {
  value: string;
  placeholder?: string;
  submitBehavior?: "submit" | "blurAndSubmit" | "newline";
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  returnKeyType?: "done" | "next" | "send" | "go" | "search";
  error?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
};

const InputField = forwardRef<TextInput, InputFieldProps>(function InputField({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
  onSubmitEditing,
  returnKeyType,
  submitBehavior,
}, ref) {
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
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        submitBehavior={submitBehavior}
        ref={ref}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
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
