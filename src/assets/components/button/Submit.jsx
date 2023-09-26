import React from "react";
import LoadingAnim from "../LoadingAnim";

function Submit({ onClick, state, children }) {
    return (
        <button className="btn-submit" type="submit" onClick={onClick} disabled={state == "loading" && true}>
            {state === "idle" ? children : (state == "loading" && <LoadingAnim />)}
        </button>
    );
}

export default Submit;
