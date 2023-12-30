import { CombineStates } from "@rbxts/reflex";
import { playersSlice } from "./players";

export * from "./players/inventory/inventorySlice";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
    players: playersSlice,
};
