import React, { useContext, useEffect, useRef } from "react";

import { ReactComponent as ThreeDots } from "../../svg/3-dots.svg";
import { ReactComponent as Trash } from "../../svg/trash.svg";

interface ChatSenderProps {
    profile: string;
    username: string;
    msg: string;
    img?: string;
    id: string;
    deleteChat: (targetId: string) => void
}

function ChatSender({ profile, username, msg, img, id, deleteChat }: ChatSenderProps) {
    const chatRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);

    const handleDelete = () => {
        deleteChat(id);
    }

    return (
        <div className="chat chat-sender" ref={chatRef}>
            <div className="chat-option">
                <button className="danger" onClick={handleDelete}>
                    <Trash />
                </button>
            </div>
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

export default ChatSender;
