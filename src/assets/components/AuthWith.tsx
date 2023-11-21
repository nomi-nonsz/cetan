import React, { ReactNode } from "react";

interface AuthWithProps {
    icon?: ReactNode;
    onClick?: () => void
    children?: ReactNode;
}

export default function AuthWith ({ icon, onClick, children }: AuthWithProps) {
    const click = () => {
        if (!onClick) {
            alert("third-party authentication not available yet");
            return;
        }
        onClick();
    }

    return (
        <button className="btn-auth-another" onClick={click}>
            {icon}
            <div>{children}</div>
        </button>
    );
}