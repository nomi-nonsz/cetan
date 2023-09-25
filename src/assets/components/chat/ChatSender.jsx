import React from "react";

function ChatSender ({ img, username, msg }) {
    return (
        <div className="chat chat-sender">
            <div className="msgbox">
                <div className="username">{username}</div>
                <div className="msg">{msg}</div>
            </div>
            <img src={img} alt="sender" />
        </div>
    )
}

export default ChatSender;