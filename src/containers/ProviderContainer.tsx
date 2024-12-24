import { SWRConfig } from "swr";
import {ReactNode, useEffect, useState} from "react";
import { ApiProvider } from "../api/ApiContext";

interface Props {
    readonly children: ReactNode;
}

export function ProviderContainer({ children }: Props) {
    const [ip, setIp] = useState("");
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

    const token = "d2Vidmlldy11c2VyOmZaWGVMR2tjejh1MVg2TFA="
    return (
        <ApiProvider data={{token, ip }}>
            <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
        </ApiProvider>
    );
}
