import React, { useContext, useState } from "react";
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import DesicionBtn from "../button/DesicionBtn";
import LoadingAnim from "../LoadingAnim";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../contexts/ChatContext";
import { ReactComponent as CloseIcon } from "../../svg/x.svg";

function ConfLogout ({ setVisible }) {
    const close = () => { setVisible(false) };

    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();
    const chatState = useContext(ChatContext);

    const logout = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                navigate("/login");
                chatState.dispatch({ type: "RESET_USER" });
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className="modal-logout">
            {isLoading ? (
                <LoadingAnim />
            ) : <>
                <button className="btn-close" onClick={close}>
                    <CloseIcon />
                </button>
                <h2>Do you wanna logout now?</h2>
                <div className="desicion">
                    <DesicionBtn.Primary onClick={logout}>Yes</DesicionBtn.Primary>
                    <DesicionBtn.Secondary onClick={close}>No</DesicionBtn.Secondary>
                </div>
            </>}
        </div>
    )
}

export default ConfLogout;