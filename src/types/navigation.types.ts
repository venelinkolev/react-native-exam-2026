import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Root Stack
export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

// Auth Stack
export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

// Home Stack
export type HomeStackParamList = {
    HomeScreen: undefined;
};

// Bottom Tab Navigator
export type MainTabParamList = {
    Home: undefined;
    Cart: undefined;
    Profile: undefined;
};

// Navigation prop types за Auth screens
export type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;
export type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;