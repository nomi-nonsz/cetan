import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

export function AuthContextProvider ({ children }) {
    const [currentUser, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        })
    }, [])
    
    return <AuthContext.Provider value={ {currentUser} }>
        {children}
    </AuthContext.Provider> 
}