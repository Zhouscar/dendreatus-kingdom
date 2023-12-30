import { RootState } from "..";

export function selectLastTimeShaked() {
    return (state: RootState) => {
        return state.cameraSlice.lastTimeShaked;
    };
}

export function selectCameraVariant() {
    return (state: RootState) => {
        return state.cameraSlice.variant;
    };
}

export function selectCamera() {
    return (state: RootState) => {
        return state.cameraSlice;
    };
}
