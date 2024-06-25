import { AnyEntity } from "@rbxts/matter";
import { createProducer } from "@rbxts/reflex";
import { CannotInteractReason } from "shared/components/interactables";
import { InteractState } from "shared/features/interactables/types";
import { ClientState } from "shared/state";

export type ECSState = {
    clientState: ClientState;
    interactEs: Map<AnyEntity, [InteractState, CannotInteractReason | "NONE"]>;
};

const initState: ECSState = {
    clientState: "title",
    interactEs: new Map(),
};

export const ecsSlice = createProducer(initState, {
    setClientState: (state, clientState: ClientState) => ({
        ...state,
        clientState: clientState,
    }),

    setInteractEs: (
        state,
        interactEs: Map<AnyEntity, [InteractState, CannotInteractReason | "NONE"]>,
    ) => ({
        ...state,
        interactEs: interactEs,
    }),
});
