import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
// import { UserContact } from "./contact.d.ts";
import { db } from "../firebase";

/**
 * 
 * @param {*} replier 
 * @param {*} sender 
 * @param {ContactStatus} status
 */
export async function setReplierStatus (replier, sender, status) {
    try {
        const replierContactRef = doc(db, "userChats", replier.uid);
        const replierContact = await getDoc(replierContactRef);

        const senderDoc = await getDoc(doc(db, "users", sender.uid));
        const replierDoc = await getDoc(doc(db, "users", replier.uid));

        if (!replierContact.exists() || !senderDoc.exists() || !replierDoc.exists()) {
            throw new Error("replier or sender doesn't exist");
        }

        const replier_to_sender_contact = {...replierContact.data()[senderDoc.data().uid]};
        replier_to_sender_contact.status = status;

        await updateDoc(replierContactRef, {
            [senderDoc.data().uid]: replier_to_sender_contact
        })
    }
    catch (error) {
        console.error(error);
    }
}

export async function insertUserToContacts (contacts) {
    const newContacts = [];

    if (contacts.length < 1)
        return contacts;
    
    try {
        const ids = [...contacts].map(({ uid }) => uid);
        const uq = query(collection(db, "users"), where('uid', 'in', ids));
        const snapshot = await getDocs(uq);

        if (snapshot.empty) return [];

        let index = 0;
        snapshot.forEach(async (user) => {
            if (ids.includes(user.data().uid)) {
                const expectedContact = contacts.filter(({ uid }) => uid === user.data().uid)[0];
                newContacts.push({
                    user: user.data(),
                    ...expectedContact,
                });
                index++;
            }
        });
        return newContacts;
    }
    catch (error) {
        console.error(error);
    }
}

/**
 * 
 * @param {*} currentUser 
 * @param {(data) => {}} cb 
 * @returns 
 */
export function getContacts (currentUser, cb) {
    const docRef = doc(db, "userChats", currentUser.uid);
    return onSnapshot(docRef, (ds) => {
        const data = ds.data();
        const objted = data ? Object.values(data) : [];

        const convertedDate = objted.sort((a, b) => {
            const dateA = new Date(a.date.toDate());
            const dateB = new Date(b.date.toDate());
            return dateB - dateA;
        })

        insertUserToContacts(convertedDate).then((finalData) => {
            cb(finalData);
        });
    })
}

/**
 * 
 * @param {*} currentUser 
 * @param {*} uid user id that want to add
 */
export async function setContact (currentUser, uid) {
    const chatColl = collection(db, "chats");
    const docRef = doc(db, "userChats", currentUser.uid);
    const targetRef = doc(db, "userChats", uid);
    const targetUser = doc(db, "users", uid);

    try {
        const docp = await getDoc(docRef);
        const user = await getDoc(targetUser);
        const targetChat = await getDoc(targetRef);

        // When user docs didn't exist
        if (!docp.exists()) await setDoc(docRef, {});
        // And when the target contact docs didn't exist
        if (!targetChat.exists()) await setDoc(targetRef, {});
        
        // Add chats for current user to contact
        if (!docp.data()[uid]) {
            const addContactsMsg = `${currentUser.displayName} Just added ${user.data().username}`;

            const chatRef = await addDoc(chatColl, {
                conversation: [],
                date: serverTimestamp(),
                users: [currentUser.uid, uid]
            });

            await updateDoc(docRef, {
                [uid]: {
                    uid,
                    date: serverTimestamp(),
                    lastMessage: addContactsMsg,
                    status: "ADDED",
                    chatId: chatRef.id
                }
            });

            // Add chats for contact for current user
            if (!targetChat.data()[currentUser.uid]) {
                await updateDoc(targetRef, {
                    [currentUser.uid]: {
                        uid: currentUser.uid,
                        date: serverTimestamp(),
                        lastMessage: addContactsMsg,
                        status: "CLEAR",
                        chatId: chatRef.id
                    }
                });
            }
        }
        
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export async function fetchReplierData (currentUser, replierData) {
    try {
        const replierRef = doc(db, "users", replierData.uid);
        const replier = await getDoc(replierRef);
        const replierContact = await getDoc(doc(db, "userChats", replier.data().uid));
        
        const chatRef = doc(db, "userChats", currentUser.uid);
        const userChat = await getDoc(chatRef);

        if (!replier.exists())
            throw new Error("Replier user not found");

        return {
            replier: replier.data(),
            chatId: userChat.data()[replier.id].chatId,
            status: replierContact.data()[currentUser.uid].status
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}