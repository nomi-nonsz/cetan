import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthContext";

function Contacts ({ setParentContacts, triggerChange }) {
    const { currentUser } = useContext(AuthContext);

    const [contacts, setContacts] = useState(null);
    const [newContacts, setNewContacts] = useState(contacts);

    const [thatValue, setValue] = useState("");

    const insertUserToContacts = async (contacts) => {
        const newContacts = [];

        if (contacts.length < 1)
            return contacts;
        
        try {
            const ids = [...contacts].map(({ uid }) => uid);
            const uq = query(collection(db, "users"), where('uid', 'in', ids));
            const snapshot = await getDocs(uq);

            if (snapshot.empty) return [];

            let index = 0;
            snapshot.forEach(async (user) => {
                if (ids.includes(user.data().uid)) {
                    const expectedContact = contacts.filter(({ uid }) => uid === user.data().uid)[0];
                    newContacts.push({
                        user: user.data(),
                        ...expectedContact,
                    });
                    index++;
                }
            });

            return newContacts;
        }
        catch (error) {
            console.error(error);
        }
    }

    const getContacts = () => {
        const docRef = doc(db, "userChats", currentUser.uid);
        return onSnapshot(docRef, (ds) => {
            const data = ds.data();
            const objted = data ? Object.values(data) : [];

            const convertedDate = objted.sort((a, b) => {
                const dateA = new Date(a.date.toDate());
                const dateB = new Date(b.date.toDate());
                return dateB - dateA;
            })

            insertUserToContacts(convertedDate).then((finalData) => {
                setContacts(finalData);
                setParentContacts(finalData);
            });
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
            <UserList
                contacts={thatValue.length > 0 ? newContacts : contacts}
                triggerChange={triggerChange}
            />
        </div>
    )
}

export default Contacts;