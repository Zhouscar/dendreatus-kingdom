import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { store } from "client/store";
import { State } from "shared/state";

function dispatchClientState(w: World, s: State) {
    if (useChange([s.clientState])) {
        store.setClientState(s.clientState);
    }
}

export = dispatchClientState;
