import { InferState, combineProducers } from "@rbxts/reflex";
import { slices } from "shared/store";
import getMiddlewares from "shared/getMiddlewares";
import { ReplicatedStorage } from "@rbxts/services";
import { ecsSlice } from "./ecs";

export type RootState = InferState<typeof store>;
export type RootProducer = typeof store;
export const store = combineProducers({
    ...slices,
    ecsSlice,
}).applyMiddleware(...getMiddlewares(ReplicatedStorage.client.store.defaultMiddlewares));
