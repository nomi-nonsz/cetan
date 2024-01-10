import React from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";

/**
 * Create account authentication
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {File} img
 * @param {React.SetStateAction<string>} btnState
 * @param {React.SetStateAction<string>} errorState
 */

function uploadProfile (user, img) {
    return new Promise((resolve, reject) => {
        const extension = img.name.split(".").pop();
        const storageRef = ref(storage, `profiles/user-${user.uid}.${extension}`);
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
            (error) => {
                reject(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    resolve(url);
                })
            })
    })
}

export async function Register (username, email, password, img) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        const downloadURL = img ? await uploadProfile(user, img) : null;

        await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL
        });

        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            photoURL: downloadURL
        });

        await setDoc(doc(db, "userChats", user.uid), {});

        await signOut(auth);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Login authentication
 * @param {string} email
 * @param {string} password
 * @param {File} img
 * @param {React.SetStateAction<string>} btnState
 * @param {React.SetStateAction<string>} errorState
 */
export function Login (email, password) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in
            const { user } = userCredential;
            if (user) {
                resolve();
            }
        }).catch((error) => {
            reject(error);
        })
    })
    .catch((error) => {
        console.error(error);
        throw error;
    })
}