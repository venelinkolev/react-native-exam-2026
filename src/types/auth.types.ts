// Request POST /login
export type LoginRequest = {
    email: string;
    username: string;
};

// Response POST /login
export type LoginResponse = {
    token: string;
};

// Global auth state in AuthContext
export type AuthState = {
    token: string | null;
    sessionID: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

// Methods in AuthContext
export type AuthContextType = AuthState & {
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
};