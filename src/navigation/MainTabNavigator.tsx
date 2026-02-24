import { Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainTabParamList } from "../types/navigation.types";

import HomeStackNavigator from "./HomeStackNavigator";
import CartScreen from "../screens/cart/CartScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { useAuth } from "../context/AuthContext";
import GuestScreen from "../screens/guest/GuestScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
    const { isGuest } = useAuth();

    return (
        <Tab.Navigator
            id="MainTabs"
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: "Начало", tabBarIcon: ({ focused }) => <Text style={{ color: focused ? "#3478f6" : "#888" }}>🏠</Text> }} />
            <Tab.Screen name="Cart" component={isGuest ? GuestScreen : CartScreen} options={{ title: "Количка", tabBarIcon: ({ focused }) => <Text style={{ color: focused ? "#3478f6" : "#888" }}>🛒</Text> }} />
            <Tab.Screen name="Profile" component={isGuest ? GuestScreen : ProfileStackNavigator} options={{ title: "Профил", tabBarIcon: ({ focused }) => <Text style={{ color: focused ? "#3478f6" : "#888" }}>👤</Text> }} />
        </Tab.Navigator>
    );
}