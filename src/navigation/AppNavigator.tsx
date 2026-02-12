import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";

import AuthNavigator from "./AuthNavigator";

import { RootStackParamList } from "../types/navigation.types";
import MainTabNavigator from "./MainTabNavigator";

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
