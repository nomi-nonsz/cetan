import React, { ReactNode, useEffect, useRef, useState } from "react";

interface SideNotifProps {
    lifetime?: number;
    children?: ReactNode
}

function SideNotif ({ lifetime, children }: SideNotifProps) {
    const [thatleft, setLeft] = useState({ left: "-50%" });

    useEffect(() => {
        return () => {
            setLeft({ left: "20px" });
    
            setTimeout(() => {
                setLeft({ left: "-50%" });
            }, 6000);
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