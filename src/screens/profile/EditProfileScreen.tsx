import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
    ActivityIndicator,
    Image,
    Platform,
    KeyboardAvoidingView,
    TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { EditProfileScreenNavigationProp } from "../../types/navigation.types";
import { UserProfileForm } from "../../types/userProfile.types";
import { getUserProfile, saveUserProfile, uploadAvatar, getAvatarUrl } from "../../services/userProfile.service";

import { onAuthStateChanged, User, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

import InputField from "../../shared/components/InputField";

export default function EditProfileScreen({ navigation }: { navigation: EditProfileScreenNavigationProp }) {
    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [newAvatarUri, setNewAvatarUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2000, 0, 1));

    const fullNameRef = useRef<TextInput>(null);
    const cityRef = useRef<TextInput>(null);
    const streetRef = useRef<TextInput>(null);
    const postCodeRef = useRef<TextInput>(null);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserProfileForm>({
        defaultValues: {
            username: "",
            fullName: "",
            birthDate: "",
            city: "",
            street: "",
            postCode: "",
        },
    });

    // Firebase user listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setFirebaseUser(user);
        });
        return () => unsubscribe();
    }, []);

    // Load existing profile data
    useEffect(() => {
        if (!firebaseUser?.uid) return;

        const loadData = async () => {
            setIsLoading(true);
            try {
                const [profile, avatar] = await Promise.all([
                    getUserProfile(firebaseUser.uid),
                    getAvatarUrl(firebaseUser.uid),
                ]);

                if (profile) {
                    setValue("fullName", profile.fullName);
                    setValue("birthDate", profile.birthDate);
                    setValue("city", profile.city);
                    setValue("street", profile.street);
                    setValue("postCode", profile.postCode);

                    if (profile.birthDate) {
                        setSelectedDate(new Date(profile.birthDate));
                    }
                }

                // Pre-fill username from Firebase Auth displayName (set during Register)
                setValue("username", profile?.username || firebaseUser.displayName || "");
                setValue("fullName", profile?.fullName || "");

                setAvatarUrl(avatar);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [firebaseUser, setValue]);

    const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === "android") {
            setShowDatePicker(false);
        }
        if (event.type === "set" && date) {
            setSelectedDate(date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const formatted = `${year}-${month}-${day}`;
            setValue("birthDate", formatted, { shouldValidate: true });
        }
    };

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Няма разрешение", "Трябва да разрешите достъп до галерията.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets.length > 0) {
            setNewAvatarUri(result.assets[0].uri);
        }
    };

    const handleSave = async (data: UserProfileForm) => {
        if (!firebaseUser?.uid) return;

        try {
            setIsSubmitting(true);

            // Upload new avatar if selected
            if (newAvatarUri) {
                const url = await uploadAvatar(firebaseUser.uid, newAvatarUri);
                setAvatarUrl(url);
            }

            // Save profile to Realtime Database
            await saveUserProfile(firebaseUser.uid, data);

            // Update displayName in Firebase Auth
            await updateProfile(firebaseUser, {
                displayName: data.fullName,
            });

            Alert.alert("Успешно! ✅", "Профилът е обновен.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch {
            Alert.alert("Грешка", "Неуспешно запазване. Моля опитай отново.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#3478f6" />
                </View>
            </SafeAreaView>
        );
    }

    const displayAvatar = newAvatarUri ?? avatarUrl;

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={100}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Avatar */}
                    <TouchableOpacity style={styles.avatarContainer} onPress={handleImagePick}>
                        {displayAvatar ? (
                            <Image source={{ uri: displayAvatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarEmoji}>👤</Text>
                            </View>
                        )}
                        <View style={styles.changePhotoBadge}>
                            <Text style={styles.changePhotoText}>📷 Смени снимка</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Personal Info Section */}
                    <Text style={styles.sectionTitle}>Лична информация</Text>

                    <Controller
                        control={control}
                        name="username"
                        rules={{ required: "Потребителското име е задължително" }}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                placeholder="Потребител"
                                value={value}
                                onChangeText={onChange}
                                error={errors.username?.message}
                                returnKeyType="next"
                                submitBehavior="submit"
                                onSubmitEditing={() => fullNameRef.current?.focus()}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="fullName"
                        rules={{ required: "Пълното име е задължително" }}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                ref={fullNameRef}
                                placeholder="Пълно име"
                                value={value}
                                onChangeText={onChange}
                                error={errors.fullName?.message}
                                returnKeyType="next"
                                submitBehavior="submit"
                                onSubmitEditing={() => cityRef.current?.focus()}
                            />
                        )}
                    />

                    {/* Birth Date Picker */}
                    <Controller
                        control={control}
                        name="birthDate"
                        rules={{ required: "Рождената дата е задължителна" }}
                        render={({ field: { value } }) => (
                            <View>
                                <TouchableOpacity
                                    style={styles.datePickerButton}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Text style={styles.datePickerLabel}>📅 Рождена дата</Text>
                                    <Text style={styles.datePickerValue}>
                                        {value ? value : "Изберете дата"}
                                    </Text>
                                </TouchableOpacity>
                                {errors.birthDate && (
                                    <Text style={styles.errorText}>{errors.birthDate.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}

                    {/* iOS — Done button to close picker */}
                    {showDatePicker && Platform.OS === "ios" && (
                        <TouchableOpacity
                            style={styles.datePickerDoneBtn}
                            onPress={() => setShowDatePicker(false)}
                        >
                            <Text style={styles.datePickerDoneBtnText}>Готово</Text>
                        </TouchableOpacity>
                    )}

                    {/* Delivery Address Section */}
                    <Text style={styles.sectionTitle}>📦 Адрес за доставка</Text>

                    <Controller
                        control={control}
                        name="city"
                        rules={{ required: "Градът е задължителен" }}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                ref={cityRef}
                                placeholder="Град"
                                value={value}
                                onChangeText={onChange}
                                error={errors.city?.message}
                                returnKeyType="next"
                                submitBehavior="submit"
                                onSubmitEditing={() => streetRef.current?.focus()}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="street"
                        rules={{ required: "Улицата е задължителна" }}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                ref={streetRef}
                                placeholder="Улица"
                                value={value}
                                onChangeText={onChange}
                                error={errors.street?.message}
                                returnKeyType="next"
                                submitBehavior="submit"
                                onSubmitEditing={() => postCodeRef.current?.focus()}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="postCode"
                        rules={{
                            required: "Пощенският код е задължителен",
                            pattern: {
                                value: /^\d+$/,
                                message: "Пощенският код трябва да съдържа само цифри",
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                ref={postCodeRef}
                                placeholder="Пощенски код"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                                returnKeyType="done"
                                onSubmitEditing={handleSubmit(handleSave)}
                                error={errors.postCode?.message}
                            />
                        )}
                    />

                    {/* Save Button */}
                    <TouchableOpacity
                        style={[styles.saveBtn, isSubmitting && { opacity: 0.7 }]}
                        onPress={handleSubmit(handleSave)}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveBtnText}>Запази промените</Text>
                        )}
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 20,
        paddingBottom: 40,
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
    sectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#555",
        marginBottom: 12,
        marginTop: 8,
    },
    datePickerButton: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    datePickerLabel: {
        fontSize: 14,
        color: "#555",
    },
    datePickerValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    datePickerDoneBtn: {
        alignSelf: "flex-end",
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#3478f6",
        borderRadius: 8,
        marginBottom: 12,
    },
    datePickerDoneBtnText: {
        color: "#fff",
        fontWeight: "600",
    },
    errorText: {
        color: "#e74c3c",
        fontSize: 12,
        marginTop: -8,
        marginBottom: 8,
        marginLeft: 4,
    },
    saveBtn: {
        backgroundColor: "#3478f6",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 16,
    },
    saveBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});