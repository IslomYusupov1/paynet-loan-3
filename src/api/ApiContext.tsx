import React, { ReactElement, ReactNode, useContext, useMemo } from "react";
import { API_HOST } from "../constants/AppConstants";

export interface ApiContextDataProps {
  readonly token?: string;
}

export interface ApiContextProps {
  readonly host: string;
}

export interface ApiProviderProps {
  readonly children: ReactNode;
  readonly data?: ApiContextDataProps;
}

function createContentValue(apiData: ApiContextDataProps): ApiContextProps {
  return {
    ...apiData,
    host: API_HOST,
  };
}

export const ApiContext = React.createContext<ApiContextProps>(createContentValue({}));

export function ApiProvider({
  data = {} as ApiContextDataProps,
  ...props
}: // eslint-disable-next-line @typescript-eslint/ban-types
ApiProviderProps): ReactElement<object> {
  const value = useMemo(() => createContentValue(data), [data]);

  return <ApiContext.Provider {...props} value={value} />;
}

export function useApiBase(): ApiContextProps {
  return useContext(ApiContext);
}
