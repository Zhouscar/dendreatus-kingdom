import variantModule, { TypeNames, VariantOf, fields } from "@rbxts/variant";
import { ViewVector } from "shared/classes";

export const CameraState = variantModule({
    none: fields<{}>(),
    follow: fields<{ target: BasePart }>(),
    angleView: fields<{ target: BasePart; viewVector: ViewVector }>(),
});

export type CameraStateName = TypeNames<typeof CameraState>;

export type CameraState<T extends CameraStateName = undefined> = VariantOf<typeof CameraState, T>;

export type CameraProps = {
    state: CameraState;
    shake?: number;
};

export const defaultCameraProps: CameraProps = { state: CameraState.none({}) };
