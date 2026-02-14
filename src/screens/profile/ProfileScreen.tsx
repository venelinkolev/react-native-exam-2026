import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const MOCK_USER = {
    email: "venelin@example.com",
    username: "venelin_k",
};

export default function ProfileScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleLogout = () => {
        Alert.alert(
            "Изход",
            "Сигурни ли сте, че искате да излезете?",
            [
                { text: "Отказ", style: "cancel" },
                { text: "Изход", style: "destructive", onPress: () => console.log("Logout pressed") },
            ]
        );
    };

    const handleImagePick = () => {
        Alert.alert("ImagePicker", "Тук ще се имплементира Expo ImagePicker.");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>👤 Профил</Text>
            </View>

            <View style={styles.content}>
                {/* Avatar */}
                <TouchableOpacity style={styles.avatarContainer} onPress={handleImagePick}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarEmoji}>👤</Text>
                        </View>
                    )}
                    <Text style={styles.changePhotoText}>Смени снимка</Text>
                </TouchableOpacity>

                {/* User Info */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Потребител</Text>
                        <Text style={styles.infoValue}>{MOCK_USER.username}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Е-мейл</Text>
                        <Text style={styles.infoValue}>{MOCK_USER.email}</Text>
                    </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutBtnText}>Изход от акаунта</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    header: {
        backgroundColor: "#3478f6",
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: "center",
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 28,
        marginTop: 10,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#dce8ff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },
    avatarEmoji: {
        fontSize: 48,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    changePhotoText: {
        fontSize: 13,
        color: "#3478f6",
    },
    infoCard: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    infoLabel: {
        fontSize: 14,
        color: "#888",
    },
    infoValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    divider: {
        height: 1,
        backgroundColor: "#f0f0f0",
    },
    logoutBtn: {
        width: "100%",
        backgroundColor: "#e74c3c",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    logoutBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});