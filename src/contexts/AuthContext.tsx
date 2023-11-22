import { onAuthStateChanged, User } from "@firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { UserInfo } from "firebase/auth";

interface AuthContextProps {
    currentUser?: UserInfo | null;
    refresh?: () => void
}

export const AuthContext = createContext<AuthContextProps | null>({
    currentUser: null,
    refresh: () => {}
});

export function AuthContextProvider ({ children }: { children: ReactNode }) {
    const [currentUser, setUser] = useState<User | null>(null);
    const [count, setCount] = useState<number>(0);

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

    const contextValue: AuthContextProps = {currentUser, refresh};
    
    return <AuthContext.Provider value={ contextValue }>
        {children}
    </AuthContext.Provider> 
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("No context");
    }
    return context;
}

export interface UserAlt {
    uid?: string,
    username?: string,
    email?: string,
    photoURL?: string
}