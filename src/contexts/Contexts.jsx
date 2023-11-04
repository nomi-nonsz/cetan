import React from "react";

import { ChatContextProvider } from './ChatContext';
import { ViewportContextProvider } from './ViewportContext';
import { ModalContextProvider } from './ModalContext';
import { AuthContextProvider } from './AuthContext';

function Contexts ({ children }) {
    return (
        <AuthContextProvider>
        <ChatContextProvider>
        <ViewportContextProvider>
        <ModalContextProvider>
        {children}
        </ModalContextProvider>
        </ViewportContextProvider>
        </ChatContextProvider>
        </AuthContextProvider>
    )
}

export default Contexts;