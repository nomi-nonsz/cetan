import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";

import Input from "../../assets/components/form/Input";
import Submit from "../../assets/components/button/Submit";

function Success () {
    const navigate = useNavigate();
    
    return (
        <div className="form-fadder">
            <div className="form-n-container">
                <div className="form-n-wrapper" style={{ width: 400 }}>
                    <form className="form-control">
                        <h2>Success!!</h2>
                        <div>New password has now been updated</div>
                        <div className="flex flex-1-1">
                            <div className="form-item">
                                <Submit state={"idle"} onClick={() => {navigate("/chats")}}>
                                    Continue
                                </Submit>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function ResetPassword () {
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    const [btnState, setBtn] = useState("idle");
    const [errMsg, setErr] = useState("");

    const passwordRef = useRef(null);
    const passwordRepeatRef = useRef(null);

    const reset = (e) => {
        e.preventDefault();

        setErr("");

        const password = passwordRef.current.value;
        const passwordRepeat = passwordRepeatRef.current.value;

        if (password !== passwordRepeat) {
            setErr("Password must be the same as the next one");
            passwordRepeatRef.current.focus();
            return;
        }

        if (password.length < 8 || passwordRepeat.length < 8) {
            setErr("Password must be 8 characters");
            passwordRef.current.focus();
            return;
        }

        setBtn("loading");

        const credential = "";
        
        reauthenticateWithCredential(currentUser, credential)
            .then(() => updatePassword(currentUser, password))
            .then(() => {
                navigate("/resetpassword/success");
            })
            .catch((err) => {
                console.error(err);
                setErr(err.message)
            })
            .finally(() => {
                setBtn("idle");
            });
    }

    return (
        <div className="form-fadder">
            <div className="form-n-container">
                <div className="form-n-wrapper" style={{ width: 400 }}>
                    <form className="form-control">
                        <h2>Reset Password</h2>
                        <Input
                            name={"pw1"}
                            text={<>Password
                                </>}
                            placeholder={"Enter password"}
                            refr={passwordRef}
                            type={"password"}
                            required={true}
                        />
                        <Input
                            name={"pw2"}
                            text={<>Reenter Password
                                </>}
                            placeholder={"Enter password"}
                            refr={passwordRepeatRef}
                            type={"password"}
                            required={true}
                        />
                        <div className="form-error">{errMsg}</div>
                        <div className="form-item">
                            <Submit state={btnState} onClick={reset}>
                                Reset Password
                            </Submit>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

ResetPassword.Sucess = Success;

export default ResetPassword;