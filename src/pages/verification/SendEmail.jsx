import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase";
import { sendPasswordResetEmail, sendSignInLinkToEmail } from "firebase/auth";

import Input from "../../assets/components/form/Input";
import Submit from "../../assets/components/button/Submit";
import { useLocation } from "react-router-dom";

function SendEmail () {
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);
    const query = searchParam.get("email");

    const [btnState, setBtn] = useState("idle");
    const [errMsg, setError] = useState("");

    const [sendCount, setCount] = useState(0);
    const [sendCountdown, setCountdown] = useState(30);
    const [startCountdown, setStartCoundown] = useState(false);

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.value = query;
    }), [];

    useEffect(() => {
        if (!startCountdown) return;

        const interval = setInterval(() => {
            if (sendCountdown < 2) {
                setBtn("idle");
                setStartCoundown(false);
                setCountdown(30);

                clearInterval(interval);
                return;
            }
            setCountdown(sendCountdown - 1);
        }, 1000);

        console.log(sendCountdown);

        return () => clearInterval(interval);
    }, [startCountdown, sendCountdown]);

    const sendEmail = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;

        setBtn("loading");
        setError("");

        sendPasswordResetEmail(auth, email).then(() => {
            setBtn("disable")
            setCount(sendCount + 1);

            setStartCoundown(true);
        }).catch((err) => {
            setError(err.message);
        }).finally(() => {
            setBtn("idle");
        })

        // due to limited quota our test was disrupted, so do this simple thing in the meantime
        /*
        sendSignInLinkToEmail(auth, email, {
            url: `${window.location.origin}/send-email/confirm`,
            handleCodeInApp: true
        }).then(() => {
            localStorage.setItem('emailVert', email);

            setBtn("disable")
            setCount(sendCount + 1);

            setStartCoundown(true);
        }).catch((err) => {
            setError(err.message);
            setBtn("idle")
        })
        */
    }

    return (
        <div className="form-fadder">
            <div className="form-n-container">
                <div className="form-n-wrapper" style={{ width: "400px" }}>
                    <form className="form-control">
                        <h2>Send Email</h2>
                        <div className="">
                            {/* We will send you an email with a link to login to your account, after which you can reset your password. */}
                            We will email you a link to reset your password.
                        </div>
                        <div className="form-error">{errMsg}</div>
                        <Input
                            name={"email"}
                            placeholder={"Enter email"}
                            refr={emailRef}
                            type={"email"}
                            required={true}
                        />
                        <div className="">{sendCount > 0 && "Email sent successfully, please check your email"}</div>
                        <div className="form-item">
                            <Submit
                                state={btnState}
                                onClick={sendEmail}>
                                    {sendCount > 0 ? `Resend${btnState == "disable" ? ` (${sendCountdown})` : ""}` : "Send"}
                            </Submit>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SendEmail;