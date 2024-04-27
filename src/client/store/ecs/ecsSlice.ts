import { AnyEntity } from "@rbxts/matter";
import { createProducer } from "@rbxts/reflex";
import { InteractState } from "shared/features/interactables/types";
import { ClientState } from "shared/state";

export type ECSState = {
    localPlrE: AnyEntity | undefined;
    clientState: ClientState;
    interactEs: Map<AnyEntity, InteractState>;
};

const initState: ECSState = {
    localPlrE: undefined,
    clientState: "game", // change this to "init" when moving onto loading screen
    interactEs: new Map(),
};

export const ecsSlice = createProducer(initState, {
    setLocalPlrE: (state, localPlrE: AnyEntity | undefined) => ({
        ...state,
        localPlrE: localPlrE,
    }),

    setClientState: (state, clientState: ClientState) => ({
        ...state,
        clientState: clientState,
    }),

    setInteractEs: (state, interactEs: Map<AnyEntity, InteractState>) => ({
        ...state,
        interactEs: interactEs,
    }),
});
