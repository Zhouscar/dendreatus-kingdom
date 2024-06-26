import { World } from "@rbxts/matter";
import { getKeysJustPressed } from "shared/hooks/keyInput";
import { ClientState, State } from "shared/state";

function toggleInventory(w: World, s: State) {
    if (!s.canOpenInventory) return;
    if (!getKeysJustPressed().includes("toggleInventory")) return;

    if (s.clientState === "inventory") {
        s.clientState = "game";
    } else if (s.clientState === "game") {
        s.clientState = "inventory";
    }
}

export = toggleInventory;
