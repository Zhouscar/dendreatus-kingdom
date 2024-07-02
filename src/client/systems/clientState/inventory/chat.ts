import { World } from "@rbxts/matter";
import { getKeysJustPressed } from "shared/hooks/keyInput";
import { ClientState, State } from "shared/state";

function chat(w: World, s: State) {
    if (!getKeysJustPressed().includes("chat")) return;

    if (s.clientState !== "game") return;

    s.clientState = "chat";
}

export = chat;
