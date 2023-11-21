import React, { createContext, useState } from "react";

export const ModalContext = createContext({});

export function ModalContextProvider ({ children }) {
    const [deleteChat, setDeleteChat] = useState({
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