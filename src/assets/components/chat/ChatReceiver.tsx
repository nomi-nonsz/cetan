import React, { useEffect, useRef } from "react";

interface ChatReceiverProps {
    profile: string;
    username: string;
    msg: string;
    img?: string;
}

function ChatReceiver({ profile, username, msg, img }: ChatReceiverProps) {
    const chatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);

    return (
        <div className="chat chat-receiver" ref={chatRef}>
            <div className="chatbox-wrapper">
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

export default ChatReceiver;
