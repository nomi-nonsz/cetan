import React, { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedComponent ({ text }) {
    return (
        <div style={{ padding: 20 }}>
            {text}
        </div>
    )
}

export default function ProtectedRoute ({ children }) {
    const { currentUser } = React.useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const requestTime = setTimeout(() => {
            if (currentUser) {
                clearTimeout(requestTime);
                return;
            }

            console.warn("Tryna get auth: request timeout");
            navigate("/");
        }, 2000)
    }, [currentUser]);

    return currentUser ? children : <ProtectedComponent text={""} />;
}