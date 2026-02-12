import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeScreenNavigationProp } from "../../types/navigation.types";

export default function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
});