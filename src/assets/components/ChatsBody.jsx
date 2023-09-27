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
            <ChatReceiver
                img={DummyPfp}
                username={"Frea"}
                msg={"Why are you speaking english"}
            />
            <ChatSender
                img={DummyPfp}
                username={"You"}
                msg={"What do you mean"}
            />
            <ChatSender
                img={DummyPfp}
                username={"You"}
                msg={"We all speaking english at whole time you fucking idiot"}
            />
            <ChatReceiver
                img={DummyPfp}
                username={"Frea"}
                msg={"Shit ma bad home"}
            />
            <ChatSender
                img={DummyPfp}
                username={"You"}
                msg={"Shut yo bicth ass bullshit nigga"}
            />
        </div>
    )
}

export default ChatsBody;