import { World } from "@rbxts/matter";
import { createContext } from "@rbxts/roact";

export const WContext = createContext<{
    w: World;
}>({ w: new World() });

export const WProvider = WContext.Provider;
