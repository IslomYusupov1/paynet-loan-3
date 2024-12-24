import { SWRConfig } from "swr";
import {ReactNode, useEffect, useState} from "react";
import { ApiProvider } from "../api/ApiContext";
import {useLocation} from "react-router";

interface Props {
    readonly children: ReactNode;
}

export function ProviderContainer({ children }: Props) {
    const [ip, setIp] = useState("");
    const location = useLocation()

    useEffect(() => {
        const fetchIP = async () => {
            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error("Ошибка при получении IP-адреса:", error);
            }
        };

        fetchIP();
    }, []);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;
        const headerElement: any = document.querySelector('.main-height-container')
        console.log(headerElement, "g")
        if (!headerElement) return;
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            let safeAreaTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)')) || 50;
            headerElement.style.paddingTop = `${safeAreaTop}px`;
        } else {
            headerElement.style.paddingTop = `24px`;
        }
    }, [location]);

    const token = "d2Vidmlldy11c2VyOmZaWGVMR2tjejh1MVg2TFA="
    return (
        <ApiProvider data={{token, ip }}>
            <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
        </ApiProvider>
    );
}
