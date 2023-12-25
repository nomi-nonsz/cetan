import React, { useState } from "react";
import LoadingAnim from "./LoadingAnim";
import { ReactComponent as PlusIcon } from "../svg/plus.svg";

function UserItem ({ img, username, chat, onClick, addBtnClick, uid }) {
    const [addBtnState, setBtnState] = useState(false);
    
    const handleAdd = () => {
        addBtnClick(uid, setBtnState);
    }

    const handleClick = (e) => {
        const event = { ...e, uid };
        if (e && onClick) onClick(event);
    }

    return (
        <button className="user-item" onClick={handleClick || null}>
            <div className="info">
                <img src={img} alt="" />
                <div className="text">
                    <div className="username">{username}</div>
                    <div className="chat">{chat}</div>
                </div>
            </div>
            <div className="btn">
                {addBtnClick && <button className="btn-add" onClick={handleAdd} disabled={addBtnState ? addBtnState === "loading" : false}>
                    {addBtnState ? (
                        addBtnState === "loading" ?
                        <LoadingAnim /> :
                        <PlusIcon />
                    ) : <PlusIcon />}
                </button>}
            </div>
        </button>
    )
}

export default UserItem;