import React from "react";

import { ChatContextProvider } from './ChatContext';
import { ViewportContextProvider } from './ViewportContext';
import { ModalContextProvider } from './ModalContext';
import { AuthContextProvider } from './AuthContext';

function Contexts ({ children }: { children: React.ReactNode }) {
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