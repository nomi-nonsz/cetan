import React, { useContext, useRef } from "react";
import { ReactComponent as SendIcon } from "../svg/send.svg";
import { ChatContext } from "../../contexts/ChatContext";
import { arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function MsgInput () {
    const message = useRef(null);

    const { state } = useContext(ChatContext);
    
    const handleSend = async (e) => {
        e.preventDefault();

        const msg = message.current.value;
        const { replier, sender } = state;

        if (msg && msg.length < 1) return;
        if (!replier && !sender) return;
        
        // try {
        //     const chatRef = doc(db, "chats", sender.uid);
        //     await updateDoc(chatRef, {
        //         [replier.uid]: arrayUnion({
        //             username: replier.username,
        //             message,
        //             datetime: serverTimestamp()
        //         })
        //     })
        // }
        // catch (error) {
        //     console.error(error);
        // }
    }

    return (
        <form className="msg-input" onSubmit={handleSend}>
            <input type="text" name="" id="" ref={message} placeholder="Write messages..." />
            <button type="submit"><SendIcon /></button>
        </form>
    )
}

export default MsgInput;