import { createContext, useContext, useEffect, useState } from "react";
import {
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../find-a-service/src/firebase/firebase.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(true);

const login = (email, password) => {
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
    displayName: user.displayName || user.email.split("@")[0],
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
    return useContext(AuthContext);
}
