import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";

import { RegisterNavigationProp } from "../../types/navigation.types";

import InputField from "../../shared/components/InputField";
import ShopLogoHeader from "../../shared/components/ShopLogoHeader";
import { useKeyboard } from "../../hooks/useKeyboard";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

type RegisterFormData = {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}


export default function Register({ navigation }: { navigation: RegisterNavigationProp }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isKeyboardVisible } = useKeyboard();

  const userNameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.userName,
      });

      Alert.alert(
        "Успешна регистрация! ✅",
        "Акаунтът е създаден. Моля впиши се.",
        [{ text: "Към вход", onPress: () => navigation.goBack() }]
      );
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;

      if (code === "auth/email-already-in-use") {
        Alert.alert("Грешка", "Този е-мейл вече е регистриран.");
      } else if (code === "auth/invalid-email") {
        Alert.alert("Грешка", "Невалиден е-мейл адрес.");
      } else if (code === "auth/weak-password") {
        Alert.alert("Грешка", "Паролата трябва да е поне 6 символа.");
      } else {
        Alert.alert("Грешка", "Неуспешна регистрация. Моля опитай отново.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        {!isKeyboardVisible && (
          <ShopLogoHeader />
        )}
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
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => userNameRef.current?.focus()}
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
                ref={userNameRef}
                placeholder="User Name"
                value={value}
                onChangeText={onChange}
                error={errors.userName?.message}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => passwordRef.current?.focus()}
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
                ref={passwordRef}
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.password?.message}
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
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
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.confirmPassword?.message}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleRegister)}
              />
            )}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, isSubmitting && { opacity: 0.7 }]}
            onPress={handleSubmit(handleRegister)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Регистрирай се</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
