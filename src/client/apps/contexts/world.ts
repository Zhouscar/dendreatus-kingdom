import { World } from "@rbxts/matter";
import { createContext } from "@rbxts/roact";
import { ClientState, State } from "shared/state";

export const WContext = createContext<{
    w: World;
    setClientState: (state: ClientState) => void;
}>({ w: new World(), setClientState: () => {} });

export const WProvider = WContext.Provider;
