import React, { useContext, useEffect, useState } from "react";

import { ReactComponent as LeftArrow } from "../svg/left-arrow.svg";

import ChatSender from "./chat/ChatSender";
import ChatReceiver from "./chat/ChatReceiver";
import LoadingAnim from "./LoadingAnim";

import { ChatContext } from "../../contexts/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { ModalContext } from "../../contexts/ModalContext";
import { deleteMessage } from "../../controllers/chats";
import moment from "moment";

function ChatsBody ({ triggerChange }) {
    const [messages, setMessages] = useState(null);
    const [replier, setReplier] = useState({});
    const [sender, setSender] = useState({});

    const { state } = useContext(ChatContext);
    const { setDeleteChat } = useContext(ModalContext);

    const deleteChat = async (id) => {
        deleteMessage(state.chatId, id).then(() => {
            setDeleteChat({
                state: false,
                payload: () => {}
            })
        })
    }

    const handleDelete = (id) => {
        setDeleteChat({
            state: true,
            payload: () => deleteChat(id)
        });
    }

    useEffect(() => {
        const isSelected = state.sender && state.replier && state.chatId;

        if (isSelected) {
            setMessages(null);
            setReplier(state.replier);
            setSender(state.sender);

            const chatRef = doc(db, "chats", state.chatId);
            const unSubrek = onSnapshot(chatRef, (data) => {
                const chats = data.data().conversation;
                setMessages(chats);
            })
    
            return () => {
                isSelected && unSubrek();
            }
        }
    }, [state.replier]);

    return (
        <div className="chats-body">
            <button className="back-btn" onClick={() => { triggerChange(false) }}>
                <LeftArrow />
            </button>
            {messages ? (
                messages.length < 1 ? (
                    <div className="no-msg">Start the conversation by saying hi to <b>{replier.username}</b></div>
                ) : (messages.map(({ message, uid, imgURL, datetime, id }, key) => {
                    const isSelected = state.sender && state.replier && state.chatId;
                    const date = moment(datetime.toDate()).format("hh:mm");
    
                    if (!isSelected) {
                        return (
                            <></>
                        )
                    }
    
                    switch (uid) {
                        case state.sender.uid:
                            return (
                                <ChatSender
                                    profile={sender.photoURL}
                                    username={"You"}
                                    msg={message}
                                    img={imgURL}
                                    date={date}
                                    key={id || key}
                                    id={id}
                                    deleteChat={handleDelete}
                                />
                            );
                        case state.replier.uid:
                            return (
                                <ChatReceiver
                                    profile={replier.photoURL}
                                    username={replier.username}
                                    msg={message}
                                    img={imgURL}
                                    date={date}
                                    key={id || key}
                                />
                            )
                    }
                }))
            ) : (
                <div className="loading">
                    <LoadingAnim />
                    <p>Please Wait...</p>
                </div>
            )}
        </div>
    )
}

export default ChatsBody;