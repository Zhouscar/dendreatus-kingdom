import { createSelector } from "@rbxts/reflex";
import { SharedState } from "../slices";
import { PlayerData } from "../slices/players/types";

export function selectPlayerKeybinds(plr: string) {
    return (state: SharedState) => {
        return state.players.keybinds[plr];
    };
}

export function selectPlayerInventory(plr: string) {
    return (state: SharedState) => {
        return state.players.inventory[plr];
    };
}

export function selectPlayerData(plr: string) {
    return createSelector(
        [selectPlayerKeybinds(plr), selectPlayerInventory(plr)],
        (keybinds, inventory): PlayerData | undefined => {
            if (!keybinds || !inventory) return;

            return { keybinds, inventory } as PlayerData;
        },
    );
}
