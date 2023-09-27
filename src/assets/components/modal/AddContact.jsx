import React, { useContext, useEffect, useRef, useState } from "react";
import { arrayUnion, collection, doc, getDoc, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase/firebase";

import UserItem from "../UserItem";
import { ReactComponent as CloseIcon } from "../../svg/x.svg";

function AddContact ({ setVisible, users }) {
    const { currentUser } = useContext(AuthContext);
    const [filterUser, setFilter] = useState(users);
    const queryRef = useRef(null);

    const watchSearch = () => {
        const q = queryRef.current.value;
        const filtered = users.filter(({ username }) => username.includes(q))
        
        setFilter(filtered)
    }

    const handleAddContact = async (uid) => {
        const docRef = doc(db, "userChats", currentUser.uid);
        const targetUser = doc(db, "users", uid)

        const docp = await getDoc(docRef);
        const user = await getDoc(targetUser);

        if (!docp.data()[uid]) {
            await updateDoc(docRef, {
                [uid]: {
                    ...user.data(),
                    date: serverTimestamp(),
                    lastMessage: ""
                }
            });
                
            const filteredUs = filterUser.filter((usr) => usr.uid !== uid);
            setFilter(filteredUs);
        }
    }

    return (
        <div className="cover-bg">
            <div className="modal-add-contact">
                <button className="btn-close" onClick={() => { setVisible(false) }}>
                    <CloseIcon />
                </button>
                <h2>Add Contact</h2>
                <div className="search-bar">
                    <input type="text" ref={queryRef} onChange={watchSearch} placeholder="Find a new user contact..." id="" />
                </div>
                <div className="result-field">
                    {filterUser.length > 0 && filterUser.map(({ email, username, photoURL, uid }, key) => (
                        <UserItem
                            uid={uid}
                            img={photoURL}
                            username={username}
                            chat={email}
                            addBtnClick={handleAddContact}
                            key={key}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddContact;