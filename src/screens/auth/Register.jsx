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

export default function Register({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = (data) => {
    console.log(data);
    // Handle registration logic here
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Регистрирай се</Text>

          {/* Email Field */}
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

          {/* User Name Field */}

          <Controller
            control={control}
            name="userName"
            rules={{
              required: "Потребителското име е задължително",
              minLength: {
                value: 3,
                message: "Минимум 3 символа",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="User Name"
                value={value}
                onChangeText={onChange}
                error={errors.userName?.message}
              />
            )}
          />

          {/* Password Field */}
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

          {/* Confirm Password Field */}
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Потвърждението на паролата е задължително",
              validate: (value) => {
                const password = control._formValues.password;
                return value === password || "Паролите не съвпадат";
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.confirmPassword?.message}
              />
            )}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(handleRegister)}
          >
            <Text style={styles.buttonText}>Регистрирай се</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>Имаш акаунт? Впиши се</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#3478f6",
    fontSize: 14,
  },
});
