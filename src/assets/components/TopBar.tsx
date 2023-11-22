import React from "react";
import { ReactComponent as Logout } from "../svg/exit.svg"

interface TopBarProps {
    img: string;
    username: string;
    email: string;
    triggerLogout: (state: boolean) => void,
    triggerBar: (state: string) => void
}

function TopBar ({ img, username, email, triggerLogout, triggerBar }: TopBarProps) {
    const toUserSettings = () => triggerBar("USER_SETTINGS");

    return (
        <div className="top-bar">
            <button className="user" onClick={toUserSettings}>
                <img src={img} alt="a user" />
                <div className="text">
                    <div className="username">{username}</div>
                    <div className="email">{email}</div>
                </div>
            </button>
            <button className="btn-logout" onClick={() => { triggerLogout(true) }}>
                <Logout />
            </button>
        </div>
    )
}

export default TopBar;