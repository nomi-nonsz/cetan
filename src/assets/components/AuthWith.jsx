import React from "react";

export default function AuthWith ({ icon, onClick, children }) {
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