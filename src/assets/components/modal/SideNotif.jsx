import React, { useEffect, useRef, useState } from "react";

function SideNotif ({ lifetime, children }) {
    const [thatleft, setLeft] = useState({ left: "-50%" });

    useEffect(() => {
        return () => {
            setLeft({ left: "20px" });
    
            setTimeout(() => {
                setLeft({ left: "-50%" });
            }, 3000);
        }
    }, []);
    
    return (
        <div className="modal-side-notif" style={thatleft}>
            <h3>Information</h3>
            <div className="msg">{ children }</div>
        </div>
    );
}

export default SideNotif;