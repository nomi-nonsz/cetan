import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UserList from "./UserList";
import { AuthContext } from "../../contexts/AuthContext";
import { getContacts } from "../../controllers/contacts";

function Contacts ({ setParentContacts, triggerChange }) {
    const { currentUser } = useContext(AuthContext);

    const [contacts, setContacts] = useState(null);
    const [newContacts, setNewContacts] = useState(contacts);

    const [thatValue, setValue] = useState("");

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
            const unsub = getContacts(currentUser, (data) => {
                setContacts(data);
                setParentContacts(data);
            });
            
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