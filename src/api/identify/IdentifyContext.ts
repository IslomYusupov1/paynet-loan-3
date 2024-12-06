import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { IdentifyApi } from "./IdentifyApi";

interface Props {
    readonly IdentifyApi: IdentifyApi;
}

export function useIdentifyContext(): Props {
    const data = useApiBase();
    const api = useMemo(() => new IdentifyApi(data), [data]);

    return {
        IdentifyApi: api,
    };
}
