import { PlayerData } from "./types";
import { defaultPlayerKeybinds } from "./keybinds/keybindsDefaults";
import { defaultPlayerInventory } from "./inventory/inventoryDefaults";

export const defaultPlayerData: PlayerData = {
    keybinds: defaultPlayerKeybinds,
    inventory: defaultPlayerInventory,
};
