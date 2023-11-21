import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
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

import AuthWith from "../assets/components/AuthWith";
import { ReactComponent as GoogleIcon } from "../assets/svg/google.svg";
import { ReactComponent as Flies } from "../assets/svg/flies.svg";
import FacebookIcon from "../assets/img/facebook.png";
import Submit from "../assets/components/button/Submit";
import FileImage from "../assets/components/form/FileImage";
import { validateMaxFile } from "../lib/fileValidator";

function RegisterPage() {
    const navigate = useNavigate();
    const [errormsg, setError] = useState("");
    const [btnState, setBtnState] = useState("idle");

    const username = useRef<HTMLInputElement | null>(null);
    const email = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const file = useRef<HTMLInputElement | null>(null);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");

        let fileimg: File | FileList | null = null;
        
        const usernameval = username.current?.value;
        const emailval = email.current?.value;
        const passwordval = password.current?.value;

        if (file.current && file.current.files) {
            fileimg = file.current?.files[0];
        }
        
        if (!usernameval && !emailval && !passwordval) return;

        // empty values error
        if (
            usernameval!.length < 1 ||
            emailval!.length < 1 ||
            passwordval!.length < 1
        ) {
            setError("Input field * must be filled");
            return;
        }

        // file size is too biggg
        if (!validateMaxFile(fileimg!, 2)) {
            setError("Image file size is too big, max 2MB");
            return;
        }

        // password char length error
        if (passwordval!.length < 9) {
            setError("Password must be 8 characters");
            return;
        }

        setBtnState("loading");

        // Nested? well i don't care
        createUserWithEmailAndPassword(auth, emailval!, passwordval!)
            .then((userCredential) => {
                return new Promise((resolve, reject) => {
                    // Signed in
                    const { user } = userCredential;
                    if (user) {
                        const thisFile = fileimg as File;
                        const extension = thisFile.name.split(".").pop();
                        const storageRef = ref(storage, `profiles/user-${user.uid}.${extension}`);
                        const uploadTask = uploadBytesResumable(storageRef, thisFile);
    
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
    
                                            setBtnState("idle");
                                            signOut(auth);

                                            resolve(navigate("/login?creatingAccount=success"));
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
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(errorCode, errorMessage);
                switch (errorCode) {
                    case "auth/email-already-in-use":
                        setError("Email is already in use");
                        break;
                    default:
                        setError(errorMessage);
                }
            })
            .finally(() => {
                setBtnState("idle");
            });
    };

    return (
        <div className="form-fadder">
            <div className="form-container form-container__w-auto">
                <header>
                    <h1>Create new account</h1>
                    <div>Start your chat today!</div>
                    <div className="form-auths">
                        <AuthWith icon={<GoogleIcon />}>Google</AuthWith>
                        <AuthWith
                            icon={<img src={FacebookIcon} alt="facebook" />}
                        >
                            Facebook
                        </AuthWith>
                    </div>
                    <div className="static__svg-flies">
                        <Flies />
                    </div>
                </header>
                <div className="form-wrapper">
                    <form>
                        <FileImage
                            refFile={file}
                        />
                        <div className="form-control">
                            <div className="form-item" aria-required>
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    ref={username}
                                    placeholder="Enter your name"
                                    id="name"
                                />
                            </div>
                            <div className="form-item" aria-required>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    ref={email}
                                    placeholder="Enter your email"
                                    id="email"
                                />
                            </div>
                            <div className="form-item" aria-required>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    ref={password}
                                    placeholder="At least 8 characters"
                                    id="password"
                                />
                            </div>
                            <div className="form-error">{errormsg}</div>
                            <div className="form-item" aria-required>
                                <Submit onClick={handleSubmit} state={btnState}>
                                    Create Account
                                </Submit>
                            </div>
                            <div className="form-footer">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
