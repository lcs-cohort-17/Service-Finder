import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from "react";

export interface AuthUser {
    id: string;
    email: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    loading: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<boolean>;

    logout: () => void;

    restoreSession: () => void;
}

const AuthContext =
    createContext<AuthContextValue | undefined>(
        undefined
    );

const AUTH_STORAGE_KEY = "servicefinder-user";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {

    const [user, setUser] =
        useState<AuthUser | null>(null);

    const [loading, setLoading] =
        useState(false);

    const restoreSession = () => {

        const storedUser =
            localStorage.getItem(
                AUTH_STORAGE_KEY
            );

        if (!storedUser) {
            return;
        }

        try {

            setUser(
                JSON.parse(storedUser)
            );

        } catch {

            localStorage.removeItem(
                AUTH_STORAGE_KEY
            );

        }

    };

    useEffect(() => {

        restoreSession();

    }, []);

    const login = async (
        email: string,
        password: string
    ) => {

        setLoading(true);

        try {

            await new Promise((resolve) =>
                setTimeout(resolve, 300)
            );

            if (!email || !password) {

                setLoading(false);

                return false;

            }

            const authenticatedUser = {

                id: crypto.randomUUID(),

                email,

            };

            localStorage.setItem(
                AUTH_STORAGE_KEY,
                JSON.stringify(authenticatedUser)
            );

            setUser(authenticatedUser);

            setLoading(false);

            return true;

        } catch {

            setLoading(false);

            return false;

        }

    };

    const logout = () => {

        localStorage.removeItem(
            AUTH_STORAGE_KEY
        );

        setUser(null);

    };

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            logout,
            restoreSession,
            isAuthenticated:
                user !== null,
        }),
        [user, loading]
    );

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}

export function useAuthContext() {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(
            "useAuthContext must be used inside an AuthProvider."
        );

    }

    return context;

}