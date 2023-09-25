import React from "react";
import DummyPfp from "../img/person.png";
import ChatSender from "./chat/ChatSender";
import ChatReceiver from "./chat/ChatReceiver";

function ChatsBody () {
    return (
        <div className="chats-body">
            <ChatSender
                img={DummyPfp}
                username={"You"}
                msg={"Hi"}
            />
            <ChatReceiver
                img={DummyPfp}
                username={"Frea"}
                msg={"Hi"}
            />
            <ChatSender
                img={DummyPfp}
                username={"You"}
                msg={"Hello eburiyan how are you, fine thank you"}
            />
            <ChatReceiver
                img={DummyPfp}
                username={"Frea"}
                msg={"Omaagaaa"}
            />
            <ChatSender
                img={DummyPfp}
                username={"You"}
                msg={"I wish i was a bird fr ngl fr frr"}
            />
        </div>
    )
}

export default ChatsBody;