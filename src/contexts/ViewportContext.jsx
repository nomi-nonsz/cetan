import React, { createContext, useEffect, useState } from "react";

export const ViewportContext = createContext();

export function ViewportContextProvider({ children }) {
    // individual values
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

    // breakpoints
    const [isLaptop, setLaptop] = useState(false);
    const [isTablet, setTablet] = useState(false);
    const [isMobile, setMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
            setViewportWidth(window.innerWidth);
            setViewportHeight(window.innerWidth);

            setLaptop(window.innerWidth <= 1280);
            setTablet(window.innerWidth <= 768);
            setMobile(window.innerWidth <= 560);
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <ViewportContext.Provider
            value={{
                viewportWidth,
                viewportHeight,
                isLaptop,
                isTablet,
                isMobile,
            }}
        >
            {children}
        </ViewportContext.Provider>
    );
}
