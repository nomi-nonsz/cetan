import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as Trash } from "../../svg/trash.svg";
import moment from "moment";

function ChatSender({
    profile,
    username,
    msg,
    img,
    date,
    id,
    deleteChat,
    handleView
}) {
    const chatRef = useRef(null);
    const [dateNow, setDateNow] = useState("");

    useEffect(() => {
        const now = moment(new Date(Date.now())).format("LT");
        setDateNow(now);
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
                        {!img && <div className="chat-option">
                            <button className="danger" onClick={handleDelete}>
                                <Trash />
                            </button>
                        </div>  }
                        <div className="msgbox">
                            <div className="username">{username}</div>
                            <div className="msg">{msg}</div>
                        </div>
                    </div>
                )}
                {img && (
                    <div className="image">
                        <div className="chat-option">
                            <button className="danger" onClick={handleDelete}>
                                <Trash />
                            </button>
                        </div>
                        <img src={img} alt="" onClick={handleView} />
                    </div>
                )}
                <div className="date">{date === dateNow ? "Just now" : date}</div>
            </div>
            <img src={profile} className="profile" alt="sender" />
        </div>
    );
}

export default ChatSender;
