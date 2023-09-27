import React, { useContext, useEffect, useRef, useState } from "react";

import UserItem from "../UserItem";
import { ReactComponent as CloseIcon } from "../../svg/x.svg";

function AddContact ({ setVisible, users }) {
    const [filterUser, setFilter] = useState(users);
    const queryRef = useRef(null);

    const watchSearch = () => {
        const q = queryRef.current.value;
        const filtered = users.filter(({ username }) => username.includes(q))
        
        setFilter(filtered)
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
                    {filterUser.length > 0 && filterUser.map(({ email, username, photoURL }, key) => (
                        <UserItem
                            img={photoURL}
                            username={username}
                            chat={email}
                            key={key}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AddContact;