import React, { useContext, useEffect, useState } from "react";
import DummyPfp from "../img/person.png";
import ChatSender from "./chat/ChatSender";
import ChatReceiver from "./chat/ChatReceiver";
import { ChatContext } from "../../contexts/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { AuthContext } from "../../contexts/AuthContext";

function ExampleChat () {
    return <>
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
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={">:("}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"🤨😏"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Fuck you nigga"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Yo"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Do you have a brother named Joe?"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Who the fuck is Joe?"}
        />
        <ChatSender
            img={DummyPfp}
            username={"You"}
            msg={"Joe mama🤣🤣🤣🤣"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"What?"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Wait What the fuck?!"}
        />
        <ChatReceiver
            img={DummyPfp}
            username={"Frea"}
            msg={"Eyo fuck you bitch you mama is so fat until she can even drive in ohio with yo family even they are have a bodyguard"}
        />
    </>
}

function ChatConsole (chats) {
    chats.forEach(({ message, username, role }, index) => {
        console.log(`${index}. [${role}](${username}): ${message}`)
    })
}

function ChatsBody () {
    const [messages, setMessages] = useState([]);
    const [replier, setReplier] = useState({});
    const [sender, setSender] = useState({});

    const { state } = useContext(ChatContext);

    useEffect(() => {
        const isSelected = state.sender && state.replier;

        if (isSelected) {
            setReplier(state.replier);
            setSender(state.sender);

            const chatRef = doc(db, "chats", state.sender.uid);
            const unSubrek = onSnapshot(chatRef, (data) => {
                const chats = data.data();
                const targetChat = chats[state.replier.uid];

                if (targetChat) {
                    // ChatConsole(targetChat);
                    setMessages(targetChat);
                }
            })
    
            return () => {
                isSelected && unSubrek();
            }
        }
    }, [state.replier]);

    return (
        <div className="chats-body">
            {messages.map(({ message, role }) => {
                switch (role) {
                    case "SENDER":
                        return (
                            <ChatSender
                                img={sender.photoURL}
                                username={"You"}
                                msg={message}
                            />
                        );
                    case "REPLIER":
                        return (
                            <ChatReceiver
                                img={replier.photoURL}
                                username={replier.username}
                                msg={message}
                            />
                        )
                }
            })}
        </div>
    )
}

export default ChatsBody;