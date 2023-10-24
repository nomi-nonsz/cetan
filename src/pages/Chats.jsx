import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";

import TopBar from "../assets/components/TopBar";
import SearchBar from "../assets/components/SearchBar";
import UserList from "../assets/components/UserList";
import TopChat from "../assets/components/TopChat";
import ChatsBody from "../assets/components/ChatsBody";
import MsgInput from "../assets/components/MsgInput";
import AddContact from "../assets/components/modal/AddContact";
import SideAdd from "../assets/components/button/SideAdd";
import ConfLogout from "../assets/components/modal/ConfLogout";
import ChatIntro from "../assets/components/ChatIntro";

function Chats() {
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext);

    // the data needed from databases
    const [contacts, setContacts] = useState([]); 
    const [users, setUsers] = useState([]);

    // idk
    const [countdown, setCount] = useState(10);

    // toggle modal
    const [showAdd, setShowAdd] = useState(false);
    const [showLogout, setLogout] = useState(false);

    const getContacts = () => {
        const docRef = doc(db, "userChats", currentUser.uid);
        return onSnapshot(docRef, (ds) => {
            const data = ds.data();
            const objted = Object.values(data);

            const convertedDate = objted
                .map(contact => {
                    contact.date = contact.date.toDate()
                    return contact;
                })
                .sort((a, b) => {
                    return b.date - a.date;
                })

            setContacts(convertedDate);
        })
    }

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

    // watch contacts when added
    useEffect(() => {
        if (currentUser.uid) {
            const unsub = getContacts();
            return () => {
                unsub();
            }
        }
    }, [currentUser.uid]);
    
    // get all user then displayed on add contacts
    useEffect(() => {
        currentUser.uid && getAllUsers()
    }, [currentUser.uid, contacts]);

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
                <div className="side-chats">
                    {currentUser ? (
                        <>
                            <TopBar
                                img={currentUser.photoURL}
                                username={currentUser.displayName}
                                triggerLogout={setLogout}
                            />
                            {showLogout == true && <ConfLogout setVisible={setLogout} />}
                            <SearchBar />
                            <UserList contacts={contacts}/>
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
                <div className="main-chat">
                    {currentUser ? (
                        state.chatId && state.replier && state.sender ? (
                            <>
                                <ChatsBody />
                                <MsgInput />
                            </>
                        ) : (
                            <ChatIntro />
                        )
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
