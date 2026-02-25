import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const FIREBASE_AUTN_KEY = "firebase_auth_token";
const SESSION_KEY = "session_id";
const GUEST_MODE_KEY = "is_guest_mode";

// ========= Auth Token Storage =========
export const saveToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

export const deleteToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

// ========= Firebase Auth Token Storage =========
export const saveFirebaseAuthToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(FIREBASE_AUTN_KEY, token);
};

export const getFirebaseAuthToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(FIREBASE_AUTN_KEY);
};
export const deleteFirebaseAuthToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(FIREBASE_AUTN_KEY);
};

// ========= Session ID Storage =========
export const saveSessionID = async (sessionID: string): Promise<void> => {
  await SecureStore.setItemAsync(SESSION_KEY, sessionID);
};

export const getSessionID = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(SESSION_KEY);
};

export const deleteSessionID = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(SESSION_KEY);
};

// ========= Guest Mode Storage =========
export const saveGuestMode = async (isGuest: boolean): Promise<void> => {
  await SecureStore.setItemAsync(GUEST_MODE_KEY, isGuest ? "true" : "false");
};

export const getGuestMode = async (): Promise<boolean> => {
  const value = await SecureStore.getItemAsync(GUEST_MODE_KEY);
  return value === "true";
};

export const deleteGuestMode = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(GUEST_MODE_KEY);
};
