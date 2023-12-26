import React, { useContext, useEffect, useRef, useState } from "react";

import { readBlobUrl } from "../../lib/naFile";
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
    const [imgUrl, setImg] = useState([]);

    const { state } = useContext(ChatContext);
    
    const handleSend = async (e) => {
        e.preventDefault();

        const msg = message.current.value;
        const { files } = imgRef.current;

        const { replier, sender } = state;

        if (msg.length < 1 && files.length < 1) return;
        if (!replier && !sender) return;
        if (btnState == "loading") return;
        
        setBtn("loading");

        try {
            await sendMessage(state, msg, files);

            // reset
            message.current.value = "";
            imgRef.current.value = [];
            setImg([]);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setBtn("idle");
        }
    }

    const updateImage = async (files) => {
        let urls = [];
        
        for (let i = 0; i < files.length; i++) {
            const url = await readBlobUrl(files[i]);
            urls.push(url);
        }

        console.log(urls);

        setImg(urls);
    }

    const cancelImage = (e) => {
        if (!e.target.attributes.itemID) return;
        const target = Number(e.target.attributes.itemID.value);
        if (isNaN(target)) return;

        const { files } = imgRef.current;
        
        /* since FileList in javacript is readonly i used DataTransfer class to manipulate
        the file values in the input so that it can be converted into a FileList. */
        const newData = new DataTransfer();
        const newUrls = [...imgUrl].filter((val, i) => i != target);

        for (let i = 0; i < files.length; i++) {
            if (i != target) {
                newData.items.add(files[i]);
            }
        }

        imgRef.current.files = newData.files;
        setImg(newUrls);
    }

    const handleImageChange = () => {
        const { files } = imgRef.current;

        if (files.length < 1) {
            setImg([]);
            return;
        }

        updateImage(files);
    }

    return (
        <div className="msg-input">
            {state.status !== "BLOCKED" ? (<>
                {imgUrl.length > 0 && <div className="file-preview">
                    {imgUrl.map((data, i) => (
                        <div className="img-item" key={i}>
                            <img src={data} alt="" />
                            <button className="cancel" itemID={i} onClick={cancelImage}>
                                <XIcon itemID={i} />
                            </button>
                        </div>
                    ))}
                </div>}
                <form className="msg-wrapper" onSubmit={handleSend}>
                    <div className="file-input">
                        <label htmlFor="file-img">
                            <ImgIcon />
                        </label>
                        <input
                            type="file"
                            id="file-img"
                            ref={imgRef} 
                            ccept="image/*"
                            onChange={handleImageChange}
                            disabled={btnState == "loading"}
                            multiple
                        />
                    </div>
                    <input type="text" name="" id="" ref={message} placeholder="Write messages..." />
                    <button type="submit" disabled={btnState == "loading"} className={btnState}>{btnState == "loading" ? <LoadingAnim /> : <SendIcon />}</button>
                </form>
            </>) : (
                <div className="msg-wrapper">
                    <div className="blocked">
                        You're <span className="text-danger">blocked</span>, You can't chat with <b>{state.replier.username}</b>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MsgInput;