import React, { useContext, useState } from "react"

import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

import { ReactComponent as ThreeDots } from "../svg/3-dots-v.svg";
import { ReactComponent as Ban } from "../svg/ban.svg";
import { ReactComponent as MinusCircle } from "../svg/minus-circle.svg";

import "~/assets/sass/options.scss";

function ChatTop () {
    const { state } = useContext(ChatContext);

    const [showOptions, setOptions] = useState(false);

    return (
        <div className="chat-top">
            <div className="user">
                <img src={state.replier.photoURL} alt="contact" />
                <div className="text">
                    <div className="username">{state.replier.username}</div>
                    <div className="email">{state.replier.email}</div>
                </div>
            </div>
            <div className="other">
                <button className="other-btn" onClick={() => setOptions(!showOptions)}>
                    <ThreeDots />
                </button>
                {showOptions && (
                    <div className="list-option">
                        <button className="list-item list-danger">
                            <Ban />
                            <div>Block</div>
                        </button>
                        <button className="list-item list-danger">
                            <MinusCircle />
                            <div>Delete Contact</div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatTop;