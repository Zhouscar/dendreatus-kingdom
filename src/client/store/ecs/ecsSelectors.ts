import { RootState } from "..";

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
