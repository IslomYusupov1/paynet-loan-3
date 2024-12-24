import {useEffect} from "react";

export const useKeyboardAwareScroll = () => {
    useEffect(() => {
        const handleResize = () => {
            console.log("a")
            const activeElement = document.activeElement;
            if (
                activeElement &&
                (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
            ) {
                activeElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
};
