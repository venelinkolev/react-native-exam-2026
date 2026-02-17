import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { AuthContextType, AuthState } from "../types/auth.types";
import {
    getToken,
    saveToken,
    deleteToken,
    saveSessionID,
    getSessionID,
    deleteSessionID,
} from "../utils/storage";

// Init state
const initialState: AuthState = {
    token: null,
    sessionID: null,
    isAuthenticated: false,
    isLoading: true,
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>(initialState);

    // When Start check for tocken and sessionID in storage
    useEffect(() => {
        const loadSession = async () => {
            try {
                const token = await getToken();
                const sessionID = await getSessionID();

                if (token && sessionID) {
                    setAuthState({
                        token,
                        sessionID,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } else {
                    setAuthState({ ...initialState, isLoading: false });
                }
            } catch {
                setAuthState({ ...initialState, isLoading: false });
            }
        };

        loadSession();
    }, []);

    // Login saves token and sessionID to storage and updates state
    const login = async (token: string) => {
        const sessionID = String(Date.now());

        await saveToken(token);
        await saveSessionID(sessionID);

        setAuthState({
            token,
            sessionID,
            isAuthenticated: true,
            isLoading: false,
        });
    };

    // Logout removes token and sessionID from storage and updates state
    const logout = async () => {
        await deleteToken();
        await deleteSessionID();

        setAuthState({
            token: null,
            sessionID: null,
            isAuthenticated: false,
            isLoading: false,
        });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom Auth hook
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth трябва да се използва вътре в AuthProvider");
    }
    return context;
}