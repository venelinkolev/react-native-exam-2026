import { ref, set, get } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import { database, storage } from "../../firebaseConfig";
import { UserProfile } from "../types/userProfile.types";

// Read profile data form Realtime Database
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
        const dbRef = ref(database, `users/${uid}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            return snapshot.val() as UserProfile;
        }
        return null;
    } catch (error) {
        console.error("Грешка при четене на профил:", error);
        return null;
    }
};

// Write profile data to Realtime Database
export const saveUserProfile = async (uid: string, data: UserProfile): Promise<void> => {
    try {
        const dbRef = ref(database, `users/${uid}`);
        await set(dbRef, data);
    } catch (error) {
        console.error("Грешка при запис на профил:", error);
        throw error;
    }
};

// Upload avatar in Firebase Storage and response download URL
export const uploadAvatar = async (uid: string, uri: string): Promise<string> => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const avatarRef = storageRef(storage, `avatars/${uid}/avatar.jpg`);
        await uploadBytes(avatarRef, blob);

        const downloadURL = await getDownloadURL(avatarRef);
        return downloadURL;
    } catch (error) {
        console.error("Грешка при качване на снимка:", error);
        throw error;
    }
};

// Get avatar URL from Firebase Storage
export const getAvatarUrl = async (uid: string): Promise<string | null> => {
    try {
        const avatarRef = storageRef(storage, `avatars/${uid}/avatar.jpg`);
        const url = await getDownloadURL(avatarRef);
        return url;
    } catch (error) {
        // If not upload image - return null
        return null;
    }
};