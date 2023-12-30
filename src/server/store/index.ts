import { InferState, combineProducers } from "@rbxts/reflex";
import { slices } from "shared/store";
import getMiddlewares from "shared/getMiddlewares";
import { ServerScriptService } from "@rbxts/services";

export type RootState = InferState<typeof store>;
export type RootProducer = typeof store;
export const store = combineProducers({
    ...slices,
}).applyMiddleware(...getMiddlewares(ServerScriptService.server.store.defaultMiddlewares));
