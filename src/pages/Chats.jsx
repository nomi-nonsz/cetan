import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { ViewportContext } from "../contexts/ViewportContext";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

import TopBar from "../assets/components/TopBar";
import ChatsBody from "../assets/components/ChatsBody";
import MsgInput from "../assets/components/MsgInput";
import AddContact from "../assets/components/modal/AddContact";
import SideAdd from "../assets/components/button/SideAdd";
import ConfLogout from "../assets/components/modal/ConfLogout";
import ChatIntro from "../assets/components/ChatIntro";
import Contacts from "../assets/components/Contacts";
import UserSettings from "../assets/components/settings/UserSettings";

function chatoFAM (state, action) {
    state.stateChatOut("")

    switch (action.type) {
        case "USER_SETTINGS":
            state.stateChat(true);
        case "RESET":
            state.stateChat(false);
            state.stateChatOut("");
    }

    return state;
}

function Chats() {
    const navigate = useNavigate();

    // contexts
    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext);
    const { isMobile } = useContext(ViewportContext);

    // toggle chat layout for mobile
    const [stateChat, setStateChat] = useState(false);

    // chat out state
    const [chatOutState, setChatOut] = useState("");
    const [chatOutReducer, chatOutDispatch] = useReducer(chatoFAM, {
        stateChat: setStateChat,
        stateChatOut: setChatOut
    });

    // the user data from database
    const [contacts, setContacts] = useState([]); 
    const [users, setUsers] = useState([]);

    // idk
    const [countdown, setCount] = useState(10);

    // toggle modal
    const [showAdd, setShowAdd] = useState(false);
    const [showLogout, setLogout] = useState(false);

    const getAllUsers = () => {
        const result = query(
            collection(db, "users"),
            where("username", "!=", currentUser.displayName)
        );
    
        return getDocs(result).then((qs) => {
            const usrs = [];
            qs.forEach(doc => {
                const data = doc.data()
                if (!contacts.some(c => c.uid === data.uid)) {
                    usrs.push(data)
                }
            });
            setUsers(usrs);
            console.log(usrs);
        });
    }
    
    // get all user then displayed on add contacts
    useEffect(() => {
        currentUser.uid && getAllUsers()
    }, [currentUser.uid]);

    // anticipate if the user has not logged in
    useEffect(() => {
        if (!currentUser) {
            const down = setInterval(() => {
                if (countdown < 1) {
                    navigate("/login");
                    return;
                }
                setCount(countdown - 1);
            }, 1000);
    
            return () => {
                clearInterval(down);
            };
        }
    }, [currentUser, countdown]);

    return (
        <>
            {showAdd == true && (
                <AddContact setVisible={setShowAdd} users={users} />
            )}
            <div className="chats">
                <div
                    className="side-chats"
                    style={isMobile ? { flex: stateChat ? 0 : 1 } : {}}
                >
                    {currentUser ? (
                        <>
                            <TopBar
                                img={currentUser.photoURL}
                                username={currentUser.displayName}
                                email={currentUser.email}
                                triggerLogout={setLogout}
                                triggerBar={(state) => {
                                    setChatOut(state);
                                    setStateChat(true);
                                }}
                            />
                            {showLogout == true && <ConfLogout setVisible={setLogout} />}
                            <Contacts
                                setParentContacts={setContacts}
                                triggerChange={setStateChat}
                            />
                            <SideAdd
                                onClick={() => {
                                    setShowAdd(true);
                                }}
                            />
                        </>
                    ) : (
                        <div className="no-user">No Signed yet</div>
                    )}
                </div>
                <div
                    className="main-chat"
                    style={isMobile ? { flex: stateChat ? 1 : 0 } : {}}
                >
                    {currentUser ? (
                        <div className="chat-wrapper">
                            {chatOutState === "USER_SETTINGS" ? (
                                <UserSettings
                                    triggerBack={async () => { 
                                        setStateChat(false);
                                        if (isMobile) await new Promise(resolve => setTimeout(resolve, 1000));
                                        setChatOut("");
                                    }}
                                />
                            ) : (state.chatId && state.replier && state.sender ? (
                                <>
                                    <ChatsBody triggerChange={setStateChat} />
                                    <MsgInput />
                                </>
                            ) : (
                                <ChatIntro />
                            ))}
                        </div>
                    ) : (
                        <div className="no-user">
                            <h3>
                                You need to login first before using the app
                            </h3>
                            <p>
                                you will be redirected to the login page in{" "}
                                {countdown} seconds
                            </p>
                            <button
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Chats;
