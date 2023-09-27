import React from "react";
import { ReactComponent as PlusIcon } from "../svg/plus.svg";

function UserItem ({ img, username, chat, onClick, addBtnClick, uid }) {
    return (
        <button className="user-item" onClick={onClick}>
            <div className="info">
                <img src={img} alt="" />
                <div className="text">
                    <div className="username">{username}</div>
                    <div className="chat">{chat}</div>
                </div>
            </div>
            <div className="btn">
                {addBtnClick && <button className="btn-add" onClick={() => { addBtnClick(uid) }}>
                    <PlusIcon />
                </button>}
            </div>
        </button>
    )
}

export default UserItem;