import { InferState, combineProducers, loggerMiddleware } from "@rbxts/reflex";
import { slices } from "shared/reflex/slices";

export type RootState = InferState<typeof store>;
export const store = combineProducers({
    ...slices,
}); //.applyMiddleware(loggerMiddleware);
