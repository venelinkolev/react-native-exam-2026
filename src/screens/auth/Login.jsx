import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [formData, setFormData] = useState({});

  const handleLogin = () => {
    // Handle login logic here
  };
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}
