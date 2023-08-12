import React from "react";
import AuthWith from "../assets/components/AuthWith";
import { ReactComponent as ImageIcon } from "../assets/svg/image.svg";
import { ReactComponent as GoogleIcon } from "../assets/svg/google.svg";
import { ReactComponent as Flies } from "../assets/svg/flies.svg";
import FacebookIcon from "../assets/img/facebook.png";

function LoginPage () {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="form-fadder">
            <div className="form-container form-container__h-auto form-container__w-auto-smol form-container__grid-slice-dope">
                <header>
                    <h1>Welcome Back!</h1>
                    <div>Let's continue your conversation!</div>
                    <div className="form-auths">
                        <AuthWith icon={ <GoogleIcon /> }>Google</AuthWith>
                        <AuthWith icon={ <img src={FacebookIcon} alt="facebook" /> }>Facebook</AuthWith>
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
                                <input type="email" name="" placeholder="Enter your email" id="email" />
                            </div>
                            <div className="form-item" aria-required>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="" placeholder="At least 8 characters" id="password" />
                            </div>
                            <div className="form-item" aria-required>
                                <button type="submit" onClick={handleSubmit}>Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;