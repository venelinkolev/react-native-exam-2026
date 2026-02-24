import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileStackParamList } from "../types/navigation.types";

import ProfileScreen from "../screens/profile/ProfileScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStackNavigator() {
    return (
        <Stack.Navigator id="ProfileStack">
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{
                    title: "Редактирай профила",
                    headerBackTitle: "Назад",
                }}
            />
        </Stack.Navigator>
    );
}