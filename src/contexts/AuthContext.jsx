import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext({
    currentUser: {
        uid: null,
        email: null,
        displayName: null,
        imgURL: null
    },
    refresh: () => {}
});

export function AuthContextProvider ({ children }) {
    const [currentUser, setUser] = useState(null);
    const [count, setCount] = useState(0);

    // idk whatever react lifecycle is
    const refresh = () => {
        setCount(count + 1);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log(user);
        })
    }, [count])
    
    return <AuthContext.Provider value={ {currentUser, refresh} }>
        {children}
    </AuthContext.Provider> 
}