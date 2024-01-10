import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Register } from "../helper/authentication";

import AuthWith from "../assets/components/AuthWith";
import { ReactComponent as GoogleIcon } from "../assets/svg/google.svg";
import { ReactComponent as Flies } from "../assets/svg/flies.svg";
import FacebookIcon from "../assets/img/facebook.png";
import Submit from "../assets/components/button/Submit";
import FileImage from "../assets/components/form/FileImage";
import { validateMaxFile } from "../lib/naFile";
import Input from "../assets/components/form/Input";

function RegisterPage() {
    const navigate = useNavigate();
    const [errormsg, setError] = useState("");
    const [btnState, setBtnState] = useState("idle");

    const username = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const file = useRef(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        
        const usernameval = username.current.value;
        const emailval = email.current.value;
        const passwordval = password.current.value;
        const fileimg = file.current.files[0];

        // empty values error
        if (
            usernameval.length < 1 ||
            emailval.length < 1 ||
            passwordval.length < 1
        ) {
            setError("Input field * must be filled");
            return;
        }

        // file size is too biggg
        if (!validateMaxFile(fileimg, 2)) {
            setError("Image file size is too big, max 2MB");
            return;
        }

        // password char length error
        if (passwordval.length < 8) {
            setError("Password must be 8 characters");
            return;
        }

        setBtnState("loading");

        Register(usernameval, emailval, passwordval, fileimg).then(() => {
            setBtnState("idle");
            navigate("/login?creatingAccount=success");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            switch (errorCode) {
                case "auth/email-already-in-use":
                    setError("Email is already in use");
                    break;
                default:
                    setError(errorMessage);
            }
        }).finally(() => {
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
                            <Input
                                name={"name"}
                                text={"Your Name"}
                                placeholder={"Enter your name"}
                                refr={username}
                                type={"text"}
                                required={true}
                            />
                            <Input
                                name={"email"}
                                text={"Email"}
                                placeholder={"Enter your email"}
                                refr={email}
                                type={"email"}
                                required={true}
                            />
                            <Input
                                name={"pw"}
                                text={"Password"}
                                placeholder={"At least 8 characters"}
                                refr={password}
                                type={"password"}
                                required={true}
                            />
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
