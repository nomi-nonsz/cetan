import React, { useContext } from "react";
import { ReactComponent as CloseIcon } from "../../svg/x.svg";
import DesicionBtn from "../button/DesicionBtn";
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../contexts/ChatContext";

function ConfLogout ({ setVisible }) {
    const close = () => { setVisible(false) };

    const navigate = useNavigate();
    const chatState = useContext(ChatContext);

    const logout = () => {
        signOut(auth);
        navigate("/login");
        chatState.dispatch({ type: "RESET_USER" });
    }

    return (
        <div className="">
            <div className="modal-logout">
                <button className="btn-close" onClick={close}>
                    <CloseIcon />
                </button>
                <h2>Do you wanna logout now?</h2>
                <div className="desicion">
                    <DesicionBtn.Primary onClick={logout}>Yes</DesicionBtn.Primary>
                    <DesicionBtn.Secondary onClick={close}>No</DesicionBtn.Secondary>
                </div>
            </div>
        </div>
    )
}

export default ConfLogout;