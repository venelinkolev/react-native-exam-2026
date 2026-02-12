import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import { AuthStackParamList } from "../types/navigation.types";

export default function AuthNavigator() {
  const Stack = createNativeStackNavigator<AuthStackParamList>();
  return (
    <Stack.Navigator id="AuthStack">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Вход" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Регистрация" }}
      />
    </Stack.Navigator>
  );
}
