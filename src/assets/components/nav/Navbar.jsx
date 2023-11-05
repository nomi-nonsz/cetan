import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { ReactComponent as Logo } from "@/public/cetan.svg";

import "~/assets/sass/components/navbar.scss";

function Navbar () {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Logo />
                    <div className="name">Cetan</div>
                </div>
                <ul className="navs">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/about/"}>About</Link></li>
                    <li><Link href={"/#sync-chat"}>Features</Link></li>
                    <li className="auth">
                        <button className="btn btn-login" onClick={() => navigate("/login")}>Login</button>
                        <button className="btn btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;