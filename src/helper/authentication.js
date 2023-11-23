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
import { auth, storage, db } from "../firebase/firebase";

/**
 * Create account authentication
 * @param {string} email
 * @param {string} password
 * @param {File} img
 * @param {React.SetStateAction<string>} btnState
 * @param {React.SetStateAction<string>} errorState
 */
export function Register (email, password, img) {
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
                                            displayName: usernameval,
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
                                        setError("Something went wrong");
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
            console.error(error.code, error.message);
            throw error;
        })
        .finally(() => {
            btnState("idle");
        });
}

/**
 * Login authentication
 * @param {string} email
 * @param {string} password
 * @param {File} img
 * @param {React.SetStateAction<string>} btnState
 * @param {React.SetStateAction<string>} errorState
 */
export function Login (email, password, btnState, errorState) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const { user } = userCredential;
            if (user) {
                navigate("/chats");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            switch (errorCode) {
                case "auth/invalid-login-credentials":
                    errorState("Wrong email or password"); break;
                default:
                    errorState(errorMessage);
            }
            console.error(errorCode, errorMessage);
        })
        .finally(() => {
            btnState("idle");
        })
}