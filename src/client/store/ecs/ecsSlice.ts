import { AnyEntity } from "@rbxts/matter";
import { createProducer } from "@rbxts/reflex";
import { CannotInteractReason } from "shared/components/interactables";
import { InteractState } from "shared/features/interactables/types";
import { ClientState } from "shared/state";

export type ECSState = {
    localPlrE: AnyEntity | undefined;
    interactEs: Map<string, [InteractState, CannotInteractReason | "NONE"]>;
    proximityPlrEs: Map<string, boolean>;
};

const initState: ECSState = {
    localPlrE: undefined,
    interactEs: new Map(),
    proximityPlrEs: new Map(),
};

export const ecsSlice = createProducer(initState, {
    setLocalPlrE: (state, localPlrE: AnyEntity | undefined) => ({
        ...state,
        localPlrE: localPlrE,
    }),

    setInteractEs: (
        state,
        interactEs: Map<string, [InteractState, CannotInteractReason | "NONE"]>,
    ) => ({
        ...state,
        interactEs: interactEs,
    }),

    setProximityPlrEs: (state, plrEs: Map<string, boolean>) => ({
        ...state,
        proximityPlrEs: plrEs,
    }),
});
