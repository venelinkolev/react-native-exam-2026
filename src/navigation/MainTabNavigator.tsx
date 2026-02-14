import { Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainTabParamList } from "../types/navigation.types";

import HomeStackNavigator from "./HomeStackNavigator";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            id="MainTabs"
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: "Начало", tabBarIcon: ({ focused }) => <Text style={{ color: focused ? "#3478f6" : "#888" }}>🏠</Text> }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Количка", tabBarIcon: ({ focused }) => <Text style={{ color: focused ? "#3478f6" : "#888" }}>🛒</Text> }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Профил", tabBarIcon: ({ focused }) => <Text style={{ color: focused ? "#3478f6" : "#888" }}>👤</Text> }} />
        </Tab.Navigator>
    );
}