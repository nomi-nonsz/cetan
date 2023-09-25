import React from "react";
import { ReactComponent as Logout } from "../svg/exit.svg"
import SamplePf from "../img/facebook.png";

function TopBar () {
    return (
        <div className="top-bar">
            <div className="user">
                <img src={SamplePf} alt="a user" />
                <div className="username">Andreq</div>
            </div>
            <button className="btn-logout">
                <Logout />
            </button>
        </div>
    )
}

export default TopBar;