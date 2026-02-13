import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeStackParamList } from "../types/navigation.types";

import HomeScreen from "../screens/home/HomeScreen";
import ProductDetailsScreen from "../screens/home/ProductDetailsScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator id="HomeStack">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false, presentation: "pageSheet" }}
            />
            <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{ title: "Описание", presentation: "modal" }}
            />
        </Stack.Navigator>
    );
}