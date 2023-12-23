import React, { createContext, useState } from "react";

export const ModalContext = createContext({});

const DEFAULT_VALUE = {
    state: false,
    payload: () => {}
};

export function ModalContextProvider ({ children }) {
    const [deleteContact, setDeleteContact] = useState(DEFAULT_VALUE);
    const [deleteChat, setDeleteChat] = useState(DEFAULT_VALUE);
    const [blockChat, setBlockChat] = useState(DEFAULT_VALUE)

    return (
        <ModalContext.Provider
            value={{
                deleteContact,
                setDeleteContact,
                deleteChat,
                setDeleteChat,
                blockChat,
                setBlockChat
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}