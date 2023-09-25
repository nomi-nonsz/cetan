import React from "react";
import TopBar from "../assets/components/TopBar";
import SearchBar from "../assets/components/SearchBar";
import UserList from "../assets/components/UserList";
import TopChat from "../assets/components/TopChat";

function Chats () {
    return (
        <div className="chats">
            <div className="side-chats">
                <TopBar />
                <SearchBar />
                <UserList />
            </div>
            <div className="main-chat">
            </div>
        </div>
    )
}

export default Chats;