import React, { useEffect, useRef } from "react";

function ChatReceiver({ profile, username, msg, date, img }) {
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);

    return (
        <div className="chat chat-receiver" ref={chatRef}>
            <div className="chatbox-wrapper">
                {msg.length > 0 && (
                    <div className="msgbox">
                        <div className="username">{username}</div>
                        <div className="msg">{msg}</div>
                    </div>
                )}
                {img && <div className="image"><img src={img} alt="" /></div>}
                <div className="date">{date}</div>
            </div>
            <img src={profile} className="profile" alt="sender" />
        </div>
    );
}

export default ChatReceiver;
