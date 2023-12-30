import { InferState, combineProducers } from "@rbxts/reflex";
import { slices } from "shared/store";
import { cameraSlice } from "./camera";
import getMiddlewares from "shared/getMiddlewares";
import { ReplicatedStorage } from "@rbxts/services";

export type RootState = InferState<typeof store>;
export type RootProducer = typeof store;
export const store = combineProducers({
    ...slices,
    cameraSlice,
}).applyMiddleware(...getMiddlewares(ReplicatedStorage.client.store.defaultMiddlewares));
