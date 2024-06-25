import { AnyEntity, World } from "@rbxts/matter";
import { createContext } from "@rbxts/roact";
import { ClientState, State } from "shared/state";

export const WContext = createContext<{
    w: World;
    setClientState: (state: ClientState) => void;
    localPlrE: AnyEntity | undefined;
}>({ w: new World(), setClientState: () => {}, localPlrE: undefined });

export const WProvider = WContext.Provider;
