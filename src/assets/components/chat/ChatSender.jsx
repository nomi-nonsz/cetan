import React, { useEffect, useRef } from "react";

function ChatSender({ profile, username, msg, img }) {
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);

    return (
        <div className="chat chat-sender" ref={chatRef}>
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
