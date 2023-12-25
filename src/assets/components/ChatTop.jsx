import React, { useContext, useState } from "react"

import { ChatContext } from "../../contexts/ChatContext";
import { deleteContact, setReplierStatus } from "../../controllers/contacts";
import { ModalContext } from "../../contexts/ModalContext";

import { ReactComponent as ThreeDots } from "../svg/3-dots-v.svg";
import { ReactComponent as Ban } from "../svg/ban.svg";
import { ReactComponent as MinusCircle } from "../svg/minus-circle.svg";

import "~/assets/sass/options.scss";

function ChatTop () {
    const { state, dispatch } = useContext(ChatContext);
    const { setBlockChat, setDeleteContact } = useContext(ModalContext);
    const contact = useContext(ChatContext);

    const [showOptions, setOptions] = useState(false);

    const blockReplier = () => {
        setBlockChat({
            state: true,
            payload: () => {
                setReplierStatus(contact.state.replier, contact.state.sender, "BLOCKED").then(() => {
                    setOptions(false);
                    setBlockChat({ state: false, payload: () => {} })
                });
            }
        })
    }

    const deleteReplier = () => {
        setDeleteContact({
            state: true,
            payload: () => {
                deleteContact(contact.state.sender, contact.state.replier).then(() => {
                    setOptions(false);

                    setDeleteContact({
                        state: false,
                        payload: () => {}
                    });
                    dispatch({
                        type: "RESET_USER"
                    });
                });
            }
        })
    }

    return (
        <div className="chat-top">
            <div className="user">
                <img src={state.replier.photoURL} alt="contact" />
                <div className="text">
                    <div className="username">{state.replier.username}</div>
                    <div className="email">{state.replier.email}</div>
                </div>
            </div>
            <button className="other">
                <button className="other-btn" onClick={() => setOptions(!showOptions)}>
                    <ThreeDots />
                </button>
                <div className="list-option">
                    <button className="list-item list-danger" onClick={blockReplier}>
                        <Ban />
                        <div>Block</div>
                    </button>
                    <button className="list-item list-danger" onClick={deleteReplier}>
                        <MinusCircle />
                        <div>Delete Contact</div>
                    </button>
                </div>
            </button>
        </div>
    )
}

export default ChatTop;