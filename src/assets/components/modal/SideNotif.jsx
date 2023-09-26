import React, { useEffect, useRef } from "react";

function SideNotif ({ lifetime, children }) {
    const thatleft = useRef(null);

    useEffect(() => {
        thatleft.current.style = { left: "20px" };

        setTimeout(() => {
            thatleft.current.style = { left: "-50%" };
            console.log(thatleft.current.style.left);
        }, 2000);
    }, []);
    
    return (
        <div className="modal-side-notif" style={{ left: "-50%" }} ref={thatleft}>
            <h2>Information</h2>
            <div className="msg">{ children }</div>
        </div>
    );
}

export default SideNotif;