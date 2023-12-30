import { createSelector } from "@rbxts/reflex";
import { PlayerData } from "./types";
import { selectPlayerInventory } from "./inventory/inventorySelectors";
import { selectPlayerKeybinds } from "./keybinds/keybindsSelectors";

export function selectPlayerData(plr: string) {
    return createSelector(
        [selectPlayerKeybinds(plr), selectPlayerInventory(plr)],
        (keybinds, inventory): PlayerData | undefined => {
            if (keybinds === undefined || inventory === undefined) return;

            return { keybinds, inventory } as PlayerData;
        },
    );
}
