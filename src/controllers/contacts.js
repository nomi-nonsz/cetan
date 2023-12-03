
import { doc, getDoc, updateDoc } from "firebase/firestore";
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