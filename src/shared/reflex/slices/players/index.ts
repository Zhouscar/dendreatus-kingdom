import { combineProducers } from "@rbxts/reflex";
import { keybindsSlice } from "./keybinds";
import { inventorySlice } from "./inventory";

export * from "./keybinds";

export const playersSlice = combineProducers({
    keybinds: keybindsSlice,
    inventory: inventorySlice,
});
