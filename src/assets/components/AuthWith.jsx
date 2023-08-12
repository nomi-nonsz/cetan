import React from "react";

export default function AuthWith ({ icon, onClick, children }) {
    return (
        <button className="btn-auth-another" onClick={onClick}>
            {icon}
            <div>{children}</div>
        </button>
    );
}