import { createSelector } from "@rbxts/reflex";
import { SharedState } from "../slices";
import { PlayerData } from "../slices/players/types";

export function selectPlayerKeybinds(plr: string) {
    return (state: SharedState) => {
        return state.players.keybinds[plr];
    };
}

export function selectPlayerData(plr: string) {
    return createSelector(selectPlayerKeybinds(plr), (keybinds): PlayerData | undefined => {
        if (!keybinds) return;

        return { keybinds };
    });
}
