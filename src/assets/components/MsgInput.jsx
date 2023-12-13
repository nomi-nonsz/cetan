import React, { useContext, useRef, useState } from "react";

import { ChatContext } from "../../contexts/ChatContext";

import LoadingAnim from "./LoadingAnim";

import { ReactComponent as SendIcon } from "../svg/send.svg";
import { ReactComponent as ImgIcon } from "../svg/image2.svg";
import { ReactComponent as XIcon } from "../svg/x.svg";
import { sendMessage } from "../../controllers/chats";

function MsgInput () {
    const message = useRef(null);
    const imgRef = useRef(null);

    const [btnState, setBtn] = useState("idle");
    const [imgUrl, setImg] = useState(null);

    const { state } = useContext(ChatContext);
    
    const handleSend = async (e) => {
        e.preventDefault();

        const msg = message.current.value;
        const file = imgRef.current.files[0];

        const { replier, sender } = state;

        if (msg.length < 1) return;
        if (!replier && !sender) return;
        if (btnState == "loading") return;
        
        setBtn("loading");

        try {
            await sendMessage(state, msg, file);

            // reset
            message.current.value = "";
            imgRef.current.value = null;
            changeImage();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setBtn("idle");
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