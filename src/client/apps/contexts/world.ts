import { World } from "@rbxts/matter";
import { createContext } from "@rbxts/roact";
import { State } from "shared/state";

export const WContext = createContext<{
    w: World;
    s: State;
    remoteToken: string;
}>({ w: new World(), s: new State(), remoteToken: "NA" });

export const WProvider = WContext.Provider;
