import { createContext } from "@rbxts/roact";

export const EnabilityContext = createContext<{
    enabled: boolean;
}>({ enabled: false });

export const EnabilityProvider = EnabilityContext.Provider;
