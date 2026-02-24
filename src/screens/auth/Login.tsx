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
import { useRef, useState } from "react";

import { LoginNavigationProp } from "../../types/navigation.types";
import { loginApiSession } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

import InputField from "../../shared/components/InputField";
import ShopLogoHeader from "../../shared/components/ShopLogoHeader";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { ENVIRONMENT } from "../../../local.environment";

type LoginFormData = {
  email: string;
  userName: string;
  password: string;
};


export default function Login({
  navigation,
}: {
  navigation: LoginNavigationProp;
}) {
  const { login, continueAsGuest, apiSession } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: "", userName: "", password: "" },
  });

  const handleApiSession = async () => {
    try {
      setIsGuest(true);

      const response = await loginApiSession({
        email: ENVIRONMENT.apiEmail,
        username: ENVIRONMENT.apiUsername,
      });

      await apiSession(response.token);

      continueAsGuest();

    } catch (error) {
      Alert.alert("Грешка", (error as Error).message);
    } finally {
      setIsGuest(false);
    }
  }

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);

      const response = await loginApiSession({
        email: ENVIRONMENT.apiEmail,
        username: ENVIRONMENT.apiUsername,
      });

      const firebaseToken = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const token = await firebaseToken.user.getIdToken();

      await login(response.token, token);
    } catch (error) {
      Alert.alert("Грешка", "Невалиден е-мейл или парола. Моля опитай отново.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ShopLogoHeader />
        <View style={styles.container}>
          <Text style={styles.title}>Впиши се</Text>

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
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            )}
          />

          {/* User Name Field */}
          {/* 
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
          /> */}

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
                returnKeyType="done"
                onSubmitEditing={handleSubmit(handleLogin)}
              />
            )}
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, isSubmitting && { opacity: 0.7 }]}
            onPress={handleSubmit(handleLogin)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Влез</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={styles.registerLink}
          >
            <Text style={styles.registerText}>
              Нямаш акаунт? Регистрирай се
            </Text>
          </TouchableOpacity>

          {/* Guest Button */}
          <TouchableOpacity
            style={[styles.button, styles.guestButton, isGuest && { opacity: 0.7 }]}
            onPress={handleApiSession}
            disabled={isGuest}
          >
            {isGuest ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Влез като гост</Text>
            )}
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
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#3478f6",
    fontSize: 14,
  },
  guestButton: {
    marginTop: 20,
    backgroundColor: "#888",
  },
});
