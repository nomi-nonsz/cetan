import React, { useContext, useRef, useState } from "react";
import { ReactComponent as SendIcon } from "../svg/send.svg";
import { ChatContext } from "../../contexts/ChatContext";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import LoadingAnim from "./LoadingAnim";

function MsgInput () {
    const message = useRef(null);
    const [btnState, setBtn] = useState("idle");

    const { state } = useContext(ChatContext);
    
    const handleSend = async (e) => {
        e.preventDefault();

        const msg = message.current.value;
        const { replier, sender, chatId } = state;

        if (msg.length < 1) return;
        if (!replier && !sender) return;
        
        try {
            setBtn("loading");

            const chatRef = doc(db, "chats", chatId);
            const contactRef = doc(db, "userChats", sender.uid);
            
            await updateDoc(chatRef, {
                conversation: arrayUnion({
                    uid: sender.uid,
                    message: msg,
                    datetime: new Date(Date.now())
                })
            })

            await updateDoc(contactRef, {
                [replier.uid]: {
                    uid: replier.uid,
                    username: replier.username,
                    email: replier.email,
                    photoURL: replier.photoURL,
                    lastMessage: `${sender.username}: ${msg}`,
                    date: serverTimestamp(),
                    chatId
                }
            })

            message.current.value = ""
            setBtn("idle");
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="msg-input" onSubmit={handleSend}>
            <input type="text" name="" id="" ref={message} placeholder="Write messages..." />
            <button type="submit" className={btnState}>{btnState == "loading" ? <LoadingAnim /> : <SendIcon />}</button>
        </form>
    )
}

export default MsgInput;