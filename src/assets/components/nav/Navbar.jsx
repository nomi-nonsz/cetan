import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

import { ReactComponent as Logo } from "../../../../public/cetan.svg";

import "~/assets/sass/components/navbar.scss";

function Navbar () {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [dropNav, setDrop] = useState(false);

    const toggleNavMobile = () => {
        setDrop(!dropNav);
    }

    return <>
        <nav className="navbar-mobile"
            style={{
                right: dropNav ? "0%" : "-100%"
            }}
        >
            <div className="navs" onClick={toggleNavMobile}>
                <Link to={"/"}>Home</Link>
                <Link to={"/about/"}>About</Link>
                <Link to={"/#sync-chat"}>Features</Link>
            </div>
            <div className="auth-btn" onClick={toggleNavMobile}>
                {!currentUser ? <>
                    <button className="btn btn-login" onClick={() => navigate("/login")}>Login</button>
                    <button className="btn btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
                </> : (
                    <button className="btn btn-login" onClick={() => navigate("/chats")}>Open Cetan</button>
                )}
            </div>
        </nav>
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to={"/"}>
                        <Logo />
                        <div className="name">Cetan</div>
                    </Link>
                </div>
                <ul className="desktop-nav">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/about/"}>About</Link></li>
                    <li><Link to={"/#sync-chat"}>Features</Link></li>
                    <li className="auth-btn">
                        {!currentUser ? <>
                            <button className="btn btn-login" onClick={() => navigate("/login")}>Login</button>
                            <button className="btn btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
                        </> : (
                            <button className="btn btn-login" onClick={() => navigate("/chats")}>Open Cetan</button>
                        )}
                    </li>
                </ul>
                <button
                    className="burgir"
                    onClick={toggleNavMobile}
                >
                    <div
                        id="bar-1"
                        style={{
                            width: dropNav ? "30px" : "40px",
                            top: dropNav ? "50%" : "40%",
                            transform: dropNav ? "translate(-50%, -50%) rotate(40deg)" : "translate(-50%, -50%) rotate(0deg)"
                        }}
                    ></div>
                    <div
                        id="bar-2"
                        style={{
                            width: dropNav ? "30px" : "40px",
                            top: dropNav ? "50%" : "60%",
                            transform: dropNav ? "translate(-50%, -50%) rotate(-40deg)" : "translate(-50%, -50%) rotate(0deg)"
                        }}
                    ></div>
                </button>
            </div>
        </nav>
    </>
}

export default Navbar;