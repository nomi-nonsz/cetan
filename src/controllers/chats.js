import moment from "moment";
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";

export function ChatConsole (chats) {
    chats.forEach(({ message, username }, index) => {
        console.log(`${index}. (${username}): ${message}`)
    })
}

/**
 * 
 * @param {File} file 
 * @returns
 */
export function sendImageMessage (file) {
    if (!file) return null;

    return new Promise((resolve, reject) => {
        const date = moment().format("YYYY-MM-DD_hh-mm-ss");
        const storageRef = ref(storage, `images/chats/CETAN-IMG_${date}_${file.name}`);
        
        uploadBytesResumable(storageRef, file)
            .then(async(snapshot) => {
                const donwloadURL = await getDownloadURL(snapshot.ref);
                resolve(donwloadURL);
            })
            .catch((error) => {
                reject(new Error(error));
            })
    })
}


export async function updateContactMessage (replier, sender, msg, chatId) {
    const senderRef = doc(db, "userChats", sender.uid);
    const replierRef = doc(db, "userChats", replier.uid);

    const shortedMsg = msg.length > 14 ? msg.slice(0, 15) + "..." : msg;

    try {
        await updateDoc(senderRef, {
            [replier.uid]: {
                uid: replier.uid,
                lastMessage: `${sender.username}: ${shortedMsg}`,
                date: serverTimestamp(),
                chatId
            }
        })

        await updateDoc(replierRef, {
            [sender.uid]: {
                uid: sender.uid,
                lastMessage: `${sender.username}: ${shortedMsg}`,
                date: serverTimestamp(),
                chatId
            }
        })
    }
    catch (error) {
        throw error
    }
}

/**
 * 
 * @param {*} contact_patch 
 * @param {string} msg 
 * @param {FileList | File[]} files
 */
export async function sendMessage (contact_patch, msg, files) {
    const { replier, sender, chatId } = contact_patch;

    try {
        const chatRef = doc(db, "chats", chatId);
        const chatDummy = collection(db, "chatDummy");

        // declare new chat data
        const newChat = {
            id: "",
            uid: sender.uid,
            message: msg,
            datetime: new Date(Date.now())
        };

        // upload first image
        const uploadedImageURL = await sendImageMessage(files[0]);

        // check if there's file exists
        if (uploadedImageURL)
            newChat.imgURL = uploadedImageURL;

        // make a dummy chat
        const dummy = await addDoc(chatDummy, {
            ...newChat,
            chatFrom: chatId
        });

        // save dummy chat id to chat
        newChat.id = dummy.id;
        
        // update chat database
        await updateDoc(chatRef, {
            conversation: arrayUnion(newChat),
            lastMessage: `${sender.username}: ${msg}`
        })

        // ok, there is a process that makes reading more complicated
        // if files are more than 1, there's new message...
        if (files.length > 1) {
            for (let i = 0; i < files.length; i++) {
                if (i == 0) continue;

                const newImageChat = {
                    id: "",
                    uid: sender.uid,
                    message: "",
                    datetime: new Date(Date.now())
                }
                
                const uploadedImageURL = await sendImageMessage(files[i]);
                const imageDummy = await addDoc(chatDummy, {
                    ...newChat,
                    chatFrom: chatId
                });
    
                newImageChat.id = imageDummy.id;
                newImageChat.imgURL = uploadedImageURL;
    
                await updateDoc(chatRef, {
                    conversation: arrayUnion(newImageChat),
                    lastMessage: `${sender.username}: ${msg}`
                })
            }
        }
        
        // update contacts after all message sending processes are complete
        await updateContactMessage(replier, sender, msg, chatId);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * 
 * @param {string} chatId 
 * @param {string} id 
 */
export async function deleteMessage (chatId, id) {
    const chatRef = doc(db, "chats", chatId);

    try {
        const chats = await getDoc(chatRef);
        const { conversation } = chats.data();

        const newConversation = conversation.filter((chat) => chat.id !== id);

        await updateDoc(chatRef, {
            conversation: newConversation
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}