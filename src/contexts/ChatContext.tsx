import React, { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { AuthContext, UserAlt, useAuthContext } from "./AuthContext";

export type ChatState = {
    sender: UserAlt | null,
    replier: UserAlt | null,
    chatId: string | null
}

export type ChatAction = {
    type: string,
    payload: {
        replier: UserAlt,
        chatId: string
    }
}

interface ChatStateInter {
    state: ChatState;
    dispatch: Dispatch<ChatAction> | null
}

export const ChatContext = createContext<ChatStateInter>({
    state: {
        sender: null,
        replier: null,
        chatId: null
    },
    dispatch: null
});

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