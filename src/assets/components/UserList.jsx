import React, { useContext } from "react";
import UserItem from "./UserItem";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import LoadingAnim from "./LoadingAnim";

function UserList ({ contacts, triggerChange }) {
    const { currentUser } = useContext(AuthContext);
    const chatCtx = useContext(ChatContext);

    const handleClickChat = async (e) => {
        try {
            const replierRef = doc(db, "users", e.uid);
            const replier = await getDoc(replierRef);
            const replierContact = await getDoc(doc(db, "userChats", replier.data().uid));
            
            const chatRef = doc(db, "userChats", currentUser.uid);
            const userChat = await getDoc(chatRef);

            if (!replier.exists())
                throw new Error("Replier user not found");
            
            chatCtx.dispatch({
                type: "CHANGE_USER",
                payload: {
                    replier: replier.data(),
                    chatId: userChat.data()[replier.id].chatId,
                    status: replierContact.data()[currentUser.uid].status
                }
            });

            triggerChange(true);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="user-list">
            {contacts ? (
                contacts.length > 0 ? contacts.map(({ user, uid, lastMessage }) => {
                    const { photoURL, username } = user;

                    return <UserItem
                        img={photoURL}
                        username={username}
                        chat={lastMessage}
                        uid={uid}
                        key={uid}
                        onClick={handleClickChat}
                    />
            }) : (
                    <div className="no-user">
                        You didn't have any contact yet<br />
                    </div>
                )
            ) : (
                <LoadingAnim />
            )}
        </div>
    )
}

export default UserList;