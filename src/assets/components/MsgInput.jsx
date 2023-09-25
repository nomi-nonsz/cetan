import React from "react";
import { ReactComponent as SendIcon } from "../svg/send.svg";

function MsgInput () {
    return (
        <form className="msg-input">
            <input type="text" name="" id="" placeholder="Write messages..." />
            <button type="submit"><SendIcon /></button>
        </form>
    )
}

export default MsgInput;