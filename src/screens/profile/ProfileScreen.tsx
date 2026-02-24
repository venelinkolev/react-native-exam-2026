import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator,
    Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { ProfileScreenNavigationProp } from "../../types/navigation.types";
import { UserProfile } from "../../types/userProfile.types";
import { getUserProfile, getAvatarUrl } from "../../services/userProfile.service";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default function ProfileScreen({ navigation }: { navigation: ProfileScreenNavigationProp }) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    // Real data from Firebase user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
        });
        return () => unsubscribe();
    }, []);

    const loadProfileData = useCallback(async (uid: string) => {
        setIsLoading(true);
        try {
            const [profile, avatar] = await Promise.all([
                getUserProfile(uid),
                getAvatarUrl(uid),
            ]);
            setUserProfile(profile);
            setAvatarUrl(avatar);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (firebaseUser?.uid) {
            loadProfileData(firebaseUser.uid);
        }
    }, [firebaseUser, loadProfileData]);

    // Reload profile data when returning from EditProfileScreen
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            if (firebaseUser?.uid) {
                loadProfileData(firebaseUser.uid);
            }
        });
        return unsubscribe;
    }, [navigation, firebaseUser, loadProfileData]);

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

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>👤 Профил</Text>
                </View>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3478f6" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]} edges={["top", "left", "right"]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>👤 Профил</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    {avatarUrl ? (
                        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarEmoji}>👤</Text>
                        </View>
                    )}
                </View>

                {/* User Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Потребител</Text>
                        <Text style={styles.infoValue}>{userProfile?.username ? userProfile.username : firebaseUser?.displayName ?? "—"}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Е-мейл</Text>
                        <Text style={styles.infoValue}>{firebaseUser?.email ?? "—"}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Пълно име</Text>
                        <Text style={styles.infoValue}>{userProfile?.fullName ?? "—"}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Рождена дата</Text>
                        <Text style={styles.infoValue}>{userProfile?.birthDate ?? "—"}</Text>
                    </View>
                </View>

                {/* Delivery Address Card */}
                <View style={styles.sectionTitle}>
                    <Text style={styles.sectionTitleText}>📦 Адрес за доставка</Text>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Град</Text>
                        <Text style={styles.infoValue}>{userProfile?.city ?? "—"}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Улица</Text>
                        <Text style={styles.infoValue}>{userProfile?.street ?? "—"}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Пощенски код</Text>
                        <Text style={styles.infoValue}>{userProfile?.postCode ?? "—"}</Text>
                    </View>
                </View>

                {/* Dark Mode Toggle */}
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Тъмен режим</Text>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            trackColor={{ false: "#ccc", true: "#3478f6" }}
                            thumbColor={isDarkMode ? "#fff" : "#fff"}
                        />
                    </View>
                </View>

                {/* Edit Button */}
                <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => navigation.navigate("EditProfileScreen")}
                >
                    <Text style={styles.editBtnText}>✏️ Редактирай профила</Text>
                </TouchableOpacity>

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
    containerDark: {
        backgroundColor: "#1a1a2e",
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
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: {
        width: "100%",
        marginBottom: 8,
    },
    sectionTitleText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#555",
    },
    editBtn: {
        width: "100%",
        backgroundColor: "#3478f6",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },
    editBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});