import { RootState } from "..";

export function selectLocalPlrE() {
    return (state: RootState) => {
        return state.ecsSlice.localPlrE;
    };
}

export function selectInteractEs() {
    return (state: RootState) => {
        return state.ecsSlice.interactEs;
    };
}

export function selectProximityPlrEs() {
    return (state: RootState) => {
        return state.ecsSlice.proximityPlrEs;
    };
}

export function selectWaypointEs() {
    return (state: RootState) => {
        return state.ecsSlice.waypointEs;
    };
}
