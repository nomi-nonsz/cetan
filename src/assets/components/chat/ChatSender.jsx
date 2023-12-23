import React, { useEffect, useRef } from "react";

import { ReactComponent as Trash } from "../../svg/trash.svg";

function ChatSender({ profile, username, msg, img, date, id, deleteChat }) {
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msg]);

    const handleDelete = () => {
        deleteChat(id);
    }

    return (
        <div className="chat chat-sender" ref={chatRef}>
            <div className="chatbox-wrapper">
                {msg.length > 0 && (
                    <div className="chat-content">
                        <div className="chat-option">
                            <button className="danger" onClick={handleDelete}>
                                <Trash />
                            </button>
                        </div>  
                        <div className="msgbox">
                            <div className="username">{username}</div>
                            <div className="msg">{msg}</div>
                        </div>
                    </div>
                )}
                {img && (
                    <div className="image">
                        {msg.length < 1 && (
                            <div className="chat-option">
                                <button className="danger" onClick={handleDelete}>
                                    <Trash />
                                </button>
                            </div>
                        )}
                        <img src={img} alt="" />
                    </div>
                )}
                <div className="date">{date}</div>
            </div>
            <img src={profile} className="profile" alt="sender" />
        </div>
    );
}

export default ChatSender;
