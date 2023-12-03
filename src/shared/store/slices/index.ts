import { CombineStates, InferState, combineProducers } from "@rbxts/reflex";
import { playersSlice } from "./players";

export * from "./players";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
    players: playersSlice,
};
