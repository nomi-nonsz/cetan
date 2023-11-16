import React, { useContext, useRef, useState } from "react";
import moment from "moment/moment";

import { ChatContext } from "../../contexts/ChatContext";

import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";

import LoadingAnim from "./LoadingAnim";

import { ReactComponent as SendIcon } from "../svg/send.svg";
import { ReactComponent as ImgIcon } from "../svg/image2.svg";
import { ReactComponent as XIcon } from "../svg/x.svg";

function MsgInput () {
    const message = useRef(null);
    const imgRef = useRef(null);

    const [btnState, setBtn] = useState("idle");
    const [imgUrl, setImg] = useState(null);

    const { state } = useContext(ChatContext);

    const sendImage = () => {
        const file = imgRef.current.files[0];
        if (!file) return;

        return new Promise((resolve, reject) => {
            const date = moment().format("YYYY:MM:DD-hh:mm:ss");
            const storageRef = ref(storage, `images/chats/CETAN-IMG_${date}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on((error) => {
                reject(new Error(error));
            }, async () => {
                const donwloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(donwloadURL);
            });
        })
    }
    
    const handleSend = async (e) => {
        e.preventDefault();

        const msg = message.current.value;
        const file = imgRef.current.files[0];

        const { replier, sender, chatId } = state;

        if (msg.length < 1) return;
        if (!replier && !sender) return;
        if (btnState == "loading") return;
        
        try {
            setBtn("loading");

            const chatRef = doc(db, "chats", chatId);
            const chatDummy = collection(db, "chatDummy");
            const contactRef = doc(db, "userChats", sender.uid);

            const newChat = {
                id: "",
                uid: sender.uid,
                message: msg,
                datetime: new Date(Date.now())
            };

            const uploadedImageURL = await sendImage();

            if (uploadedImageURL)
                newChat.imgURL = uploadedImageURL;

            const dummy = await addDoc(chatDummy, {
                ...newChat,
                chatFrom: chatId
            });

            newChat.id = dummy.id;
            
            await updateDoc(chatRef, {
                conversation: arrayUnion(newChat),
                lastMessage: `${sender.username}: ${msg}`
            })

            setBtn("idle");

            // reset
            message.current.value = "";
            imgRef.current.value = null;
            changeImage();
            
            await updateDoc(contactRef, {
                [replier.uid]: {
                    uid: replier.uid,
                    username: replier.username,
                    email: replier.email,
                    photoURL: replier.photoURL,
                    lastMessage: `${sender.username}: ${msg}`,
                    date: serverTimestamp(),
                    chatId
                }
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    const cancelImage = () => {
        imgRef.current.value = null;
        setImg(null);
    }

    const changeImage = () => {
        const file = imgRef.current.files[0];

        if (!file) {
            setImg(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => { return setImg(e.target.result) };
        reader.readAsDataURL(file);
    }

    return (
        <div className="msg-input">
            {imgUrl &&
                <div className="file-preview">
                    <div className="img-item">
                        <img src={imgUrl} alt="" />
                        <button className="cancel" onClick={cancelImage}>
                            <XIcon />
                        </button>
                    </div>
                </div>
            }
            <form className="msg-wrapper" onSubmit={handleSend}>
                <div className="file-input">
                    <label htmlFor="file-img">
                        <ImgIcon />
                    </label>
                    <input type="file" id="file-img" ref={imgRef} accept="image/*" onChange={changeImage} />
                </div>
                <input type="text" name="" id="" ref={message} placeholder="Write messages..." />
                <button type="submit" disabled={btnState == "loading"} className={btnState}>{btnState == "loading" ? <LoadingAnim /> : <SendIcon />}</button>
            </form>
        </div>
    )
}

export default MsgInput;