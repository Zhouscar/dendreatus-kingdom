import { combineProducers } from "@rbxts/reflex";
import { keybindsSlice } from "./keybinds";

export * from "./keybinds";

export const playersSlice = combineProducers({
    keybinds: keybindsSlice,
});
