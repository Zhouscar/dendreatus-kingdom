import { RootState } from "..";

export function selectLocalPlrE() {
    return (state: RootState) => {
        return state.ecsSlice.localPlrE;
    };
}

export function selectClientState() {
    return (state: RootState) => {
        return state.ecsSlice.clientState;
    };
}

export function selectInteractEs() {
    return (state: RootState) => {
        return state.ecsSlice.interactEs;
    };
}