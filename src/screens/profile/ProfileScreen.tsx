import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../../context/AuthContext";

const AVATAR_KEY = "user_avatar_uri";

const MOCK_USER = {
    email: "venelin@example.com",
    username: "venelin_k",
};

export default function ProfileScreen() {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const { logout } = useAuth();

    // Load saved avatar URI on mount
    useEffect(() => {
        const loadAvatar = async () => {
            const saved = await AsyncStorage.getItem(AVATAR_KEY);
            if (saved) setImageUri(saved);
        };
        loadAvatar();
    }, []);

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Няма разрешение",
                "Трябва да разрешите достъп до галерията за да смените снимката."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            // Save the selected image URI to AsyncStorage
            await AsyncStorage.setItem(AVATAR_KEY, uri);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            "Изход",
            "Сигурни ли сте, че искате да излезете?",
            [
                { text: "Отказ", style: "cancel" },
                { text: "Изход", style: "destructive", onPress: () => logout() },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>👤 Профил</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Avatar */}
                <TouchableOpacity style={styles.avatarContainer} onPress={handleImagePick}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarEmoji}>👤</Text>
                        </View>
                    )}
                    <View style={styles.changePhotoBadge}>
                        <Text style={styles.changePhotoText}>📷 Смени снимка</Text>
                    </View>
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

            </ScrollView>
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
        padding: 20,
        alignItems: "center",
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 28,
        marginTop: 10,
    },
    avatarPlaceholder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: "#dce8ff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    avatarEmoji: {
        fontSize: 52,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 10,
    },
    changePhotoBadge: {
        backgroundColor: "#e8f0ff",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    changePhotoText: {
        fontSize: 13,
        color: "#3478f6",
        fontWeight: "600",
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