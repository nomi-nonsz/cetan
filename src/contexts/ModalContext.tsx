import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface StateValue {
    state: boolean;
    payload: () => void
}

interface ModalProvider {
    deleteChat: StateValue;
    setDeleteChat: Dispatch<SetStateAction<StateValue>>
}

export const ModalContext = createContext<ModalProvider>({
    deleteChat: {
        state: false,
        payload: () => {}
    },
    setDeleteChat: () => {}
});

export function ModalContextProvider ({ children }: { children: ReactNode }) {
    const [deleteChat, setDeleteChat] = useState<StateValue>({
        state: false,
        payload: () => {}
    });

    return (
        <ModalContext.Provider
            value={{
                deleteChat,
                setDeleteChat
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}