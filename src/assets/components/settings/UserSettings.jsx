import React, { useContext, useEffect, useRef, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { ViewportContext } from "../../../contexts/ViewportContext";
import { AuthContext } from "../../../contexts/AuthContext";
import FileImage from "../form/FileImage";
import LoadingAnim from "../LoadingAnim";

import { validateMaxFile } from "../../../lib/fileValidator";

import { ReactComponent as ArrowLeft } from "../../svg/left-arrow.svg";
import { ReactComponent as X } from "../../svg/x.svg";
import { ReactComponent as Clipboard } from "../../svg/clipboard.svg";
import { ReactComponent as Check } from "../../svg/check.svg";

function UserSettings({ triggerBack }) {
    const { isMobile } = useContext(ViewportContext);
    const { currentUser, refresh } = useContext(AuthContext);

    const [isCopied, setCopied] = useState(false);

    const [profile, setProfile] = useState("");
    const [username, setUsername] = useState(currentUser.displayName);

    const [btnState, setBtn] = useState("idle");
    const [isChanged, setChanged] = useState(false);

    const [errorMsg, setError] = useState("");

    const refProfile = useRef(null);
    const refUsername = useRef(null);
    const refEmail = useRef(null);
    // const refUid = useRef(null);

    useEffect(() => {
        const isChange =
            (username !== currentUser.displayName) ||
            (profile.length > 0);

        setChanged(isChange);
    }, [username, profile]);

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

    const updateProfileImage = () => {
        const file = refProfile.current.files[0];
        if (!file) return;

        return new Promise((resolve, reject) => {
            const extension = file.name.split(".").pop();
            const storageRef = ref(storage, `profiles/user-${currentUser.uid}.${extension}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on((error) => {
                reject(new Error(error));
            }, async () => {
                const savedURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(savedURL);
            });
        })
    }

    const handleSave = async(e) => {
        e.preventDefault();

        const file = refProfile.current.files[0]

        if (btnState == "loading") return;

        if (username.length < 1) {
            errorMsg("The changed data must not be empty");
            return;
        }

        if (file && !validateMaxFile(file, 2)) {
            errorMsg("Image file size is too big, max 2MB");
            return;
        }

        const docRef = doc(db, "users", currentUser.uid);

        setBtn("loading");

        try {
            // update photo soon
            const newData = { username };
            const newProfile = { displayName: username };

            if (file) {
                const savedURL = await updateProfileImage();

                newData.photoURL = savedURL;
                newProfile.photoURL = savedURL;
            }

            await updateDoc(docRef, newData);
            await updateProfile(currentUser, newProfile);

            refresh();
            
        } catch (error) {
            console.error(error);
            setError(error);
        }

        setBtn("idle");
    }

    return (
        <div className="settings user-settings" onSubmit={handleSave}>
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
                        onChange={(e) => {
                            setProfile(e.target.value);
                        }}
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
                <section className="settings-item">
                    <div className="error-msg">{errorMsg}</div>
                </section>
                <section className="settings-item">
                    <button
                        type="submit"
                        disabled={!isChanged && (btnState == "idle")}
                    >
                        {btnState == "idle" ?
                        "Save Changes" : <LoadingAnim />}
                    </button>
                </section>
            </form>
        </div>
    );
}

export default UserSettings;
