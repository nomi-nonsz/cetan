import React, { useContext } from "react";
import { ReactComponent as Logout } from "../svg/exit.svg"
import SamplePf from "../img/person.png";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router";
import { ChatContext } from "../../contexts/ChatContext";

function TopBar ({ img, username }) {
    const navigate = useNavigate();

    const chatState = useContext(ChatContext).state;

    const logout = () => {
        signOut(auth);
        chatState.dispatch({ type: "RESET_USER" });
        navigate("/login");
    }

    return (
        <div className="top-bar">
            <div className="user">
                <img src={img} alt="a user" />
                <div className="username">{username}</div>
            </div>
            <button className="btn-logout" onClick={logout}>
                <Logout />
            </button>
        </div>
    )
}

export default TopBar;