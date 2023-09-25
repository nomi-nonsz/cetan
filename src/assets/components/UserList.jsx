import React from "react";
import SamplePf from "../img/facebook.png";
import UserItem from "./UserItem";

function UserList ({ data }) {
    return (
        <div className="user-list">
            <UserItem img={SamplePf} username="Drea" chat="Aight bet" />
            <UserItem img={SamplePf} username="Fina" chat="Hello" />
            <UserItem img={SamplePf} username="Rawr" chat="Dang" />
        </div>
    )
}

export default UserList;