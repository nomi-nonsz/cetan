import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthWith from "../assets/components/AuthWith";
import { ReactComponent as GoogleIcon } from "../assets/svg/google.svg";
import { ReactComponent as Flies } from "../assets/svg/flies.svg";
import FacebookIcon from "../assets/img/facebook.png";
import SideNotif from "../assets/components/modal/SideNotif";
import Submit from "../assets/components/button/Submit";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase/firebase";
import { Login } from "../helper/authentication";

function LoginPage() {
    const navigate = useNavigate();

    const location = useLocation().search;
    const search = new URLSearchParams(location);
    const registerSuccess = search.get("creatingAccount");

    const [errorMsg, setError] = useState("");
    const [btnState, setBtnState] = useState("idle");

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email.length < 1 || password.length < 1) {
            setError("Email and password must be filled in");
            return;
        }

        setBtnState("loading");
        
        Login(email, password).then(() => {
            navigate("/chats");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            switch (errorCode) {
                case "auth/invalid-login-credentials":
                    setError("Wrong email or password"); break;
                default:
                    setError(errorMessage);
            }
        })
        .finally(() => {
            setBtnState("idle");
        })
    };

    return (
        <>
            {registerSuccess && (
                <SideNotif>
                    Successful creating a new account, now login
                </SideNotif>
            )}
            <div className="form-fadder">
                <div className="form-container form-container__h-auto form-container__w-auto-smol form-container__grid-slice-dope">
                    <header>
                        <h1>Welcome Back!</h1>
                        <div>Let's continue your conversation!</div>
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
                            <div className="form-control">
                                <div className="form-item" aria-required>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        placeholder="Enter your email"
                                        id="email"
                                    />
                                </div>
                                <div className="form-item" aria-required>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        ref={passwordRef}
                                        placeholder="At least 8 characters"
                                        id="password"
                                    />
                                </div>
                                <div className="form-error">{errorMsg}</div>
                                <div className="form-item" aria-required>
                                    <Submit
                                        onClick={handleSubmit}
                                        state={btnState}
                                    >
                                        Login
                                    </Submit>
                                </div>
                                <div className="form-footer">
                                    Don't have any account? <Link to="/signup">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
