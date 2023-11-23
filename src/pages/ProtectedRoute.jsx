import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute ({ children }) {
    const { currentUser } = React.useContext(AuthContext);

    if (!currentUser.uid) {
        return <Navigate to="/" />
    }

    return children;
}