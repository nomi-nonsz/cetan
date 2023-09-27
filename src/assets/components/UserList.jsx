import React from "react";
import UserItem from "./UserItem";

function UserList ({ contacts }) {
    return (
        <div className="user-list">
            {contacts && contacts.length > 0 ? contacts.map(({ photoURL, username }, key) => (
                <UserItem
                    img={photoURL}
                    username={username}
                    chat={"example"}
                    key={key}
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