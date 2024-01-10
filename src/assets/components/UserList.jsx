import React, { useContext, useEffect, useState } from "react";
import UserItem from "./UserItem";
import { readAllMessage } from "../../controllers/chats";
import { fetchReplierData, insertUnreadCountToContacts } from "../../controllers/contacts";

import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

import LoadingAnim from "./LoadingAnim";

function UserList ({ contacts, triggerChange }) {
    const { currentUser } = useContext(AuthContext);
    const chatCtx = useContext(ChatContext);

    const [contactsDisplay, setDisplay] = useState(null);

    useEffect(() => {
        if (contactsDisplay == null) setDisplay(contacts);
    }, [contacts]);

    const handleClickChat = async (e) => {
        const data = await fetchReplierData(currentUser, e);

        chatCtx.dispatch({
            type: "CHANGE_USER",
            payload: data
        });

        triggerChange(true);

        await readAllMessage(currentUser, data.chatId)
        const newContacts = await insertUnreadCountToContacts(currentUser, contactsDisplay);

        setDisplay(newContacts);
    }

    return (
        <div className="user-list">
            {contactsDisplay ? (
                contactsDisplay.length > 0 ? contactsDisplay.map(({ user, uid, lastMessage, readed }) => {
                    const { photoURL, username } = user;

                    return <UserItem
                        img={photoURL}
                        username={username}
                        chat={lastMessage}
                        count={readed}
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