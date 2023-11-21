import React, { FormEvent, ReactNode } from "react";
import LoadingAnim from "../LoadingAnim";

interface SubmitProps {
    onClick: (e: FormEvent) => void;
    state?: string,
    children?: ReactNode
}

function Submit({ onClick, state, children }: SubmitProps) {
    return (
        <button className="btn-submit" type="submit" onClick={onClick} disabled={state == "loading" && true}>
            {state === "idle" ? children : (state == "loading" && <LoadingAnim />)}
        </button>
    );
}

export default Submit;
