import React, { useContext } from "react";
import UserItem from "./UserItem";
import { fetchReplierData } from "../../controllers/contacts";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";
import LoadingAnim from "./LoadingAnim";

function UserList ({ contacts, triggerChange }) {
    const { currentUser } = useContext(AuthContext);
    const chatCtx = useContext(ChatContext);

    const handleClickChat = (e) => {
        fetchReplierData(currentUser, e).then((data) => {
            chatCtx.dispatch({
                type: "CHANGE_USER",
                payload: data
            });
            triggerChange(true);
        })
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