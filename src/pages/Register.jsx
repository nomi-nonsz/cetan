import React from "react";
import { ReactComponent as ImageIcon } from "../assets/svg/image.svg";

function RegisterPage () {
    return (
        <div className="form-fadder">
            <div className="form-container">
                <header>
                    <h1>Create new account</h1>
                    <div>Start your chat today!</div>
                </header>
                <form className="form-wrapper">
                    <div className="form-file">
                        <label htmlFor="uplod">
                            <ImageIcon />
                            <div>Profile image</div>
                        </label>
                        <input type="file" name="" id="uplod" />
                    </div>
                    <div className="form-control">
                        <div className="form-item">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" name="" id="name" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="" id="email" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="" id="password" />
                        </div>
                        <div className="form-item">
                            <button type="submit">Create Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;