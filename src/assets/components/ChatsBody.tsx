import React, { useContext, useEffect, useState } from "react";

import { ReactComponent as LeftArrow } from "../svg/left-arrow.svg";
import ChatSender from "./chat/ChatSender";
import ChatReceiver from "./chat/ChatReceiver";
import LoadingAnim from "./LoadingAnim";

import { ChatContext } from "../../contexts/ChatContext";
import { DocumentData, DocumentReference, arrayRemove, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ModalContext } from "../../contexts/ModalContext";
import { ChatsDocument, ConversationMap } from "../../lib/types";
import { UserAlt } from "../../contexts/AuthContext";

type ChatConsoleType = {
    message: string,
    username: string
}

function ChatConsole (chats: ChatConsoleType[]) {
    chats.forEach(({ message, username }: ChatConsoleType, index: number) => {
        console.log(`${index}. (${username}): ${message}`)
    })
}

interface ChatBodyPop {
    triggerChange: (state: boolean) => void
}

function ChatsBody ({ triggerChange }: ChatBodyPop) {
    const [messages, setMessages] = useState<ConversationMap[] | null>(null);
    const [replier, setReplier] = useState<UserAlt>({});
    const [sender, setSender] = useState<UserAlt>({});

    const { state } = useContext(ChatContext);
    const { setDeleteChat } = useContext(ModalContext);

    const deleteChat = async (id: string) => {
        const chatRef = doc(db, "chats", state.chatId as string);
        
        try {
            const chats = await getDoc(chatRef);
            const { conversation }: ChatsDocument = chats.data() as ChatsDocument;

            const newConversation = conversation.filter((chat) => chat.id !== id);

            await updateDoc(chatRef, {
                conversation: newConversation
            });

            setDeleteChat({
                state: false,
                payload: () => {}
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = (id: string) => {
        console.log(`Debug: deleted chat ${id}`);
        setDeleteChat({
            state: true,
            payload: () => deleteChat(id)
        });
    }

    useEffect(() => {
        const isSelected = state.sender && state.replier && state.chatId;

        if (isSelected) {
            setMessages(null);
            setReplier(state.replier as UserAlt);
            setSender(state.sender as UserAlt);

            const chatRef = doc(db, "chats", state.chatId!);
            const unSubrek = onSnapshot(chatRef, (data) => {
                const { conversation: chats } = data.data() as ChatsDocument;
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
                ) : (messages.map(({ message, uid, imgURL, id }, key) => {
                    const isSelected = state.sender && state.replier && state.chatId;
    
                    if (!isSelected) {
                        return (
                            <></>
                        )
                    }
    
                    switch (uid) {
                        case state.sender?.uid:
                            return (
                                <ChatSender
                                    profile={sender.photoURL!}
                                    username={"You"}
                                    msg={message}
                                    img={imgURL}
                                    key={id || key}
                                    id={id}
                                    deleteChat={handleDelete}
                                />
                            );
                        case state.replier?.uid:
                            return (
                                <ChatReceiver
                                    profile={replier.photoURL!}
                                    username={replier.username!}
                                    msg={message}
                                    img={imgURL}
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