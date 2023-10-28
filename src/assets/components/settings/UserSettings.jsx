import React, { useContext, useEffect, useRef, useState } from "react";
import { ViewportContext } from "../../../contexts/ViewportContext";
import { AuthContext } from "../../../contexts/AuthContext";
import FileImage from "../form/FileImage";

import { ReactComponent as ArrowLeft } from "../../svg/left-arrow.svg";
import { ReactComponent as X } from "../../svg/x.svg";
import { ReactComponent as Clipboard } from "../../svg/clipboard.svg";
import { ReactComponent as Check } from "../../svg/check.svg";

function UserSettings({ triggerBack }) {
    const { isMobile } = useContext(ViewportContext);
    const { currentUser } = useContext(AuthContext);

    const [isCopied, setCopied] = useState(false);
    const [username, setUsername] = useState(currentUser.displayName);

    const refProfile = useRef(null);
    const refUsername = useRef(null);
    const refEmail = useRef(null);
    // const refUid = useRef(null);

    const copyUid = async () => {
        // alternative
        // refUid.current.select();
        // document.execCommand("copy");
        try {
            const { uid } = currentUser;
            await navigator.clipboard.writeText(uid);
            setCopied(true);
            await new Promise(resolve => setTimeout(resolve, 3000));
            setCopied(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="settings user-settings">
            <button className="btn-back" onClick={triggerBack}>
                {isMobile ? <ArrowLeft /> : <X />}
            </button>
            <h1>User Settings</h1>
            <hr />
            <form className="settings-form">
                <section className="setttings-item profile-image">
                    <h2>Avatar</h2>
                    <FileImage
                        refFile={refProfile}
                        src={currentUser.photoURL}
                    />
                </section>
                <section className="settings-item">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        ref={refUsername}
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                    />
                    <div className="desc">Username is displayed publicly</div>
                </section>
                <section className="settings-item">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        ref={refEmail}
                        id="email"
                        placeholder="Enter your email"
                        value={currentUser.email}
                        disabled
                    />
                    <div className="desc">
                        Email editing feature is not currently available
                    </div>
                </section>
                <section className="settings-item">
                    <label>User ID</label>
                    <div className="fish">
                        <input type="text" value={currentUser.uid} disabled />
                        <button type="button" className="bit-btn" onClick={copyUid}>
                            {isCopied ? <Check /> : <Clipboard />}
                        </button>
                    </div>
                    <div className="desc">
                        Share with friends, companions, services, anyone to
                        communicate with you
                    </div>
                </section>
            </form>
        </div>
    );
}

export default UserSettings;
