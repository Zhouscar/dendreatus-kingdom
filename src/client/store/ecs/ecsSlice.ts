import { AnyEntity } from "@rbxts/matter";
import { createProducer } from "@rbxts/reflex";
import { ClientState } from "shared/state";

export type ECSState = {
    localPlrE: AnyEntity | undefined;
    clientState: ClientState;
};

const initState: ECSState = {
    localPlrE: undefined,
    clientState: "game", // change this to "init" when moving onto loading screen
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
});
