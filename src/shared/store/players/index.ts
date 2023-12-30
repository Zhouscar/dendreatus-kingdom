import { combineProducers } from "@rbxts/reflex";
import { inventorySlice } from "./inventory/inventorySlice";
import { keybindsSlice } from "./keybinds/keybindsSlice";
import { RunService } from "@rbxts/services";

export const playersSlice = combineProducers({
    keybinds: keybindsSlice,
    inventory: inventorySlice,
});
