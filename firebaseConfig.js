import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { ENVIRONMENT } from "./local.environment";

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = ENVIRONMENT.firebase;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app, ENVIRONMENT.databaseURL);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);