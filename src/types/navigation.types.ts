import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { ProductParam } from "./product.types";

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
    ProductDetails: { product: ProductParam };
};

// Bottom Tab Navigator
export type MainTabParamList = {
    Home: undefined;
    Cart: undefined;
    Profile: undefined;
};

// Navigation prop types за Main Tab Screens
export type HomeTabNavigationProp = BottomTabNavigationProp<MainTabParamList, "Home">;
export type CartTabNavigationProp = BottomTabNavigationProp<MainTabParamList, "Cart">;
export type ProfileTabNavigationProp = BottomTabNavigationProp<MainTabParamList, "Profile">;

// Navigation prop types за Home Stack Screens
export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, "HomeScreen">;
export type ProductDetailsNavigationProp = NativeStackNavigationProp<HomeStackParamList, "ProductDetails">;

// Navigation prop types за Auth Screens
export type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;
export type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;