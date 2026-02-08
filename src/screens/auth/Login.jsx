import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../shared/components/InputField";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const handleLogin = (data) => {
    console.log(data);
    // Handle login logic here
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Впиши се</Text>

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Е-мейла е задължителен",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Невалиден е-мейл адрес",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Паролата е задължителна",
              minLength: {
                value: 6,
                message: "Минимум 6 символа",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleLogin)}
          >
            <Text style={styles.buttonText}>Влез</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //   wrapper: {
  //     flex: 1,
  //     backgroundColor: "#fff",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3478f6",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
