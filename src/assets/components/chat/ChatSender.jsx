import React from "react";

function ChatSender({ profile, username, msg, img }) {
    return (
        <div className="chat chat-sender">
            <div className="chat-wrapper">
                <div className="msgbox">
                    <div className="username">{username}</div>
                    <div className="msg">{msg}</div>
                </div>
                {img && <div className="image"><img src={img} alt="" /></div>}
            </div>
            <img src={profile} className="profile" alt="sender" />
        </div>
    );
}

export default ChatSender;
