import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}