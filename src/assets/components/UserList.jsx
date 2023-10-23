import React, { useContext } from "react";
import UserItem from "./UserItem";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

function UserList ({ contacts }) {
    const { currentUser } = useContext(AuthContext);
    const chatCtx = useContext(ChatContext);

    const handleClickChat = async (e) => {
        const contactUid = e.uid;

        try {
            const chatRef = doc(db, "chats", currentUser.uid);
            const chat = await getDoc(chatRef);
            
            if (!chat.data()[contactUid]) {
                await updateDoc(chatRef, {
                    [contactUid]: []
                })
                console.log(`Updated chats from contacts: ${contactUid}`);
            }

            const replierRef = doc(db, "users", e.uid);
            const replier = await getDoc(replierRef);

            if (!replier.exists())
                throw new Error("Replier user not found");
            
            chatCtx.dispatch({
                type: "CHANGE_USER",
                payload: {
                    sender: currentUser,
                    replier: replier.data()
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="user-list">
            {contacts && contacts.length > 0 ? contacts.map(({ photoURL, username, uid }, key) => (
                <UserItem
                    img={photoURL}
                    username={username}
                    chat={"example"}
                    uid={uid}
                    key={uid}
                    onClick={handleClickChat}
                />
            )) : (
                <div className="no-user">
                    You didn't have any contact yet<br />
                </div>
            )}
        </div>
    )
}

export default UserList;