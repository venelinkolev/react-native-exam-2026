import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Register() {
  const [formData, setFormData] = useState({});

  const handleRegister = () => {
    // Handle registration logic here
  };
  return (
    <View>
      <Text>Register</Text>
    </View>
  );
}
