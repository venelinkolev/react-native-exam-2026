import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";

import { RootStackParamList } from "../types/navigation.types";

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator id="RootStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      {/* Add other navigators or screens here */}
    </Stack.Navigator>
  );
}
