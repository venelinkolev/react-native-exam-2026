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
  firebaseToken: string | null;
  sessionID: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
};

// Methods in AuthContext
export type AuthContextType = AuthState & {
  login: (token: string, firebaseToken: string) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: () => Promise<void>; // Changed to async
  apiSession: (token: string) => Promise<void>;
};
