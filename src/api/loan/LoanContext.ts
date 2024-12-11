import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { LoanApi } from "./LoanApi.ts";

interface Props {
    readonly LoanApi: LoanApi;
}

export function useLoanContext(): Props {
    const data = useApiBase();
    const api = useMemo(() => new LoanApi(data), [data]);

    return {
        LoanApi: api,
    };
}
