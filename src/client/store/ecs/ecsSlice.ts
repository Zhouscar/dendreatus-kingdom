import { AnyEntity } from "@rbxts/matter";
import { createProducer } from "@rbxts/reflex";
import { CannotInteractReason } from "shared/components/interactables";
import { IsWaypoint, Waypoint } from "shared/components/waypoints";
import { InteractState } from "shared/features/interactables/types";
import { selectWaypointEs } from "./ecsSelectors";

export type ECSState = {
    localPlrE: AnyEntity | undefined;
    interactEs: Map<string, [InteractState, CannotInteractReason | "NONE"]>;
    proximityPlrEs: Map<string, boolean>;
    waypointEs: Map<string, IsWaypoint>;
};

const initState: ECSState = {
    localPlrE: undefined,
    interactEs: new Map(),
    proximityPlrEs: new Map(),
    waypointEs: new Map(),
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

    selectWaypointEs: (state, waypointEs: Map<string, IsWaypoint>) => ({
        ...state,
        waypointEs: waypointEs,
    }),
});
