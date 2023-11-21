import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { AuthContext, UserAlt, useAuthContext } from "./AuthContext";

export const ChatContext = createContext({});

export type ChatState = {
    sender: UserAlt | null,
    replier: UserAlt | null,
    chatId: string | null
}

export type ChatAction = {
    type: "CHANGE_USER",
    payload: {
        replier: UserAlt,
        chatId: string
    }
} | {
    type: "RESET_USER"
}

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
    const { currentUser } = useAuthContext();

    const INITIAL_STATE = {
        sender: null,
        replier: null,
        chatId: null
    }

    const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    sender: {
                        uid: currentUser!.uid,
                        username: currentUser!.displayName!,
                        email: currentUser!.email!,
                        photoURL: currentUser!.photoURL!
                    },
                    replier: action.payload.replier,
                    chatId: action.payload.chatId
                };
            case "RESET_USER":
                return {
                    sender: null,
                    replier: null,
                    chatId: null
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}