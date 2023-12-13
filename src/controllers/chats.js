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


export async function updateContactMessage (replier, sender, msg, chatId) {
    const senderRef = doc(db, "userChats", sender.uid);
    const replierRef = doc(db, "userChats", replier.uid);

    try {
        await updateDoc(senderRef, {
            [replier.uid]: {
                uid: replier.uid,
                lastMessage: `${sender.username}: ${msg}`,
                date: serverTimestamp(),
                chatId
            }
        })

        await updateDoc(replierRef, {
            [sender.uid]: {
                uid: sender.uid,
                lastMessage: `${sender.username}: ${msg}`,
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
 * @param {File} file 
 */
export async function sendMessage (contact_patch, msg, file) {
    const { replier, sender, chatId } = contact_patch;

    try {
        const chatRef = doc(db, "chats", chatId);
        const chatDummy = collection(db, "chatDummy");

        const newChat = {
            id: "",
            uid: sender.uid,
            message: msg,
            datetime: new Date(Date.now())
        };

        const uploadedImageURL = await sendImageMessage(file);

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