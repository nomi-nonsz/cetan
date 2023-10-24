import React from "react";
import { ReactComponent as Logout } from "../svg/exit.svg"

function TopBar ({ img, username, triggerLogout }) {
    return (
        <div className="top-bar">
            <div className="user">
                <img src={img} alt="a user" />
                <div className="username">{username}</div>
            </div>
            <button className="btn-logout" onClick={() => { triggerLogout(true) }}>
                <Logout />
            </button>
        </div>
    )
}

export default TopBar;