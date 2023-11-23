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
export function Register (username, email, password, img) {
    // Nested hell? well i don't care
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return new Promise((resolve, reject) => {
                // Signed in
                const { user } = userCredential;
                if (user) {
                    const extension = img.name.split(".").pop();
                    const storageRef = ref(storage, `profiles/user-${user.uid}.${extension}`);
                    const uploadTask = uploadBytesResumable(storageRef, img);

                    uploadTask.on(
                        (error) => {
                            setError("Something went wrong when uploading image");
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                async (downloadURL) => {
                                    try {
                                        await updateProfile(user, {
                                            displayName: username,
                                            photoURL: downloadURL
                                        })
                                        await setDoc(doc(db, "users", user.uid), {
                                            uid: user.uid,
                                            username: user.displayName,
                                            email: user.email,
                                            photoURL: downloadURL
                                        })
                                        await setDoc(doc(db, "userChats", user.uid), {});

                                        await signOut(auth);
                                        resolve();
                                    }
                                    catch (error) {
                                        reject(error);
                                    }
                                }
                            );
                        }
                    );
                }
                else {
                    reject(new Error("User is not found"));
                }
            })
        })
        .catch((error) => {
            console.error(error);
            throw error;
        })
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