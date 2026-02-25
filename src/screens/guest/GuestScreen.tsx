import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function GuestScreen() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <View style={guestStyles.container}>
            <Text style={guestStyles.icon}>🔒</Text>
            <Text style={guestStyles.title}>Тази страница изисква вход</Text>
            <Text style={guestStyles.subtitle}>
                Влез в профила си, за да използваш тази функция.
            </Text>
            <TouchableOpacity
                style={guestStyles.button}
                onPress={handleLogout}
            >
                <Text style={guestStyles.buttonText}>Към вход</Text>
            </TouchableOpacity>
        </View>
    );
}

const guestStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor: "#f2f2f2",
    },
    icon: {
        fontSize: 48,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#888",
        textAlign: "center",
        marginBottom: 24,
    },
    button: {
        backgroundColor: "#3478f6",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
});