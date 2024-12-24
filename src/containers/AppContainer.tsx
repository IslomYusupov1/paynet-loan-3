import RootContainer from "./RootContainer.tsx";
import {useEffect} from "react";

function AppContainer() {
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;
        const headerElement: any = document.querySelector('.main-height-container')
        if (!headerElement) return;

        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            //@ts-ignore
            let safeAreaTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)', 50));
            headerElement.style.paddingTop = `${safeAreaTop}px`;
        } else {
            headerElement.style.paddingTop = `24px`;
        }
    }, []);
    return (
        <RootContainer/>
    );
}

export default AppContainer;