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
            <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: "Начало" }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Количка" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Профил" }} />
        </Tab.Navigator>
    );
}