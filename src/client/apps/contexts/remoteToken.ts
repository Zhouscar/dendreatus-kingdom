import { createContext } from "@rbxts/roact";

export const RemoteTokenContext = createContext<{
    remoteToken: string;
}>({ remoteToken: "NA" });

export const RemoteTokenProvider = RemoteTokenContext.Provider;
