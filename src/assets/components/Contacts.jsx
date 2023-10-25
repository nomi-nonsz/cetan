import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthContext";

function Contacts ({ setParentContacts }) {
    const { currentUser } = useContext(AuthContext);

    const [contacts, setContacts] = useState([]);
    const [newContacts, setNewContacts] = useState(contacts);

    const [thatValue, setValue] = useState("");

    const getContacts = () => {
        const docRef = doc(db, "userChats", currentUser.uid);
        return onSnapshot(docRef, (ds) => {
            const data = ds.data();
            const objted = Object.values(data);

            const convertedDate = objted
                .map(contact => {
                    return contact;
                })
                .sort((a, b) => {
                    const dateA = new Date(a.date.toDate());
                    const dateB = new Date(b.date.toDate());
                    return dateB - dateA;
                })

            setContacts(convertedDate);
            setParentContacts(convertedDate);
        })
    }

    const searchUser = (e) => {
        const search = e.target.value;

        setValue(search);

        if (search.length < 1) {
            setContacts(contacts);
            return;
        }

        const filteredContacts = contacts.filter(({ username }) => {
            if (username.toLowerCase().includes(search.toLowerCase()))
                return true;

            return false;
        })
        
        setNewContacts(filteredContacts);
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

    return (
        <div className="contacts">
            <SearchBar onChange={searchUser} />
            <UserList contacts={thatValue.length > 0 ? newContacts : contacts} />
        </div>
    )
}

export default Contacts;