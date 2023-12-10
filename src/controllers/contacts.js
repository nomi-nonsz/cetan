
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
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
        console.log(error);
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