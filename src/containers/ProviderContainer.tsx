import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { ApiProvider } from "../api/ApiContext";

interface Props {
  readonly children: ReactNode;
}

export function ProviderContainer({ children }: Props) {

    const token = "cGF5bmV0LXVzZXI6aW9qaG4zNGhndnR0eWR3ZXdk"

  return (
    <ApiProvider data={{token}}>
      <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
    </ApiProvider>
  );
}
