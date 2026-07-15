import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.js";

type CurrentUser = {
  uid: string;
  email: string | null;
  displayName: string;
};

type AuthContextValue = {
  currentUser: CurrentUser | null;
  login: (email: string, password: string) => ReturnType<typeof signInWithEmailAndPassword>;
  logout: () => ReturnType<typeof signOut>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): React.JSX.Element {
const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
const [loading, setLoading] = useState(true);

const login = (email: string, password: string) => {
return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
return signOut(auth);
};

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (user) => {
if (user) {
setCurrentUser({
uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split("@")[0] || "User",
});
    } else {
    setCurrentUser(null);
   }

   setLoading(false);
    });

    return unsubscribe;
}, []);

  const value = {
    currentUser,
    login,
    logout,
    };

return (
    <AuthContext.Provider value={value}>
    {!loading && children}
    </AuthContext.Provider>
    );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
