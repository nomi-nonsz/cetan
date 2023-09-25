import React from "react";

function UserItem ({ img, username, chat }) {
    return (
        <div className="user-item">
            <img src={img} alt="" />
            <div className="text">
                <div className="username">{username}</div>
                <div className="chat">{chat}</div>
            </div>
        </div>
    )
}

export default UserItem;