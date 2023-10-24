import React from "react"

function Primary ({ onClick, children }) {
    return <button onClick={onClick} className="dsc-btn-primary">{children}</button>
}

function Secondary ({ onClick, children }) {
    return <button onClick={onClick} className="dsc-btn-secondary">{children}</button>
}

function DesicionBtn () {
    return <></>
}

DesicionBtn.Primary = Primary;
DesicionBtn.Secondary = Secondary;

export default DesicionBtn;