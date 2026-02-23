import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from "../types/navigation.types";

import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, isLoading, isGuest } = useAuth();

  // Spinner while checking auth state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3478f6" />
      </View>
    );
  }

  return (
    <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
      {isAuthenticated || isGuest ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}