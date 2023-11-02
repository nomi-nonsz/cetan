import React from "react";
import DesicionBtn from "../button/DesicionBtn";
import { ReactComponent as CloseIcon } from "../../svg/x.svg";

function ConfDelete ({ title, message, accept, reject }) {
    return (
        <div className="cover-bg">
            <div className="modal-delete">
                <button className="btn-close" onClick={reject}>
                    <CloseIcon />
                </button>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="desicion">
                    <DesicionBtn.Danger onClick={accept}>Yes</DesicionBtn.Danger>
                    <DesicionBtn.Secondary onClick={reject}>No</DesicionBtn.Secondary>
                </div>
            </div>
        </div>
    )
}

export default ConfDelete;