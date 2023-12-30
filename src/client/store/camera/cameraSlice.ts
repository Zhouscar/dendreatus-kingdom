import { createProducer } from "@rbxts/reflex";
import variantModule, { TypeNames, VariantOf, fields } from "@rbxts/variant";
import { ViewVector } from "shared/classes";

export const CameraVariant = variantModule({
    none: fields<{}>(),
    track: fields<{ target: BasePart }>(),
    view: fields<{ target: BasePart; viewVector: ViewVector }>(),
});

export type CameraVariant<T extends TypeNames<typeof CameraVariant> = undefined> = VariantOf<
    typeof CameraVariant,
    T
>;

export type CameraState = {
    lastTimeShaked: number;
    shakeIntensity: number;

    variant: CameraVariant;
};

const initState: CameraState = {
    lastTimeShaked: -1,
    shakeIntensity: 0,

    variant: CameraVariant.none({}),
};

export const cameraSlice = createProducer(initState, {
    switchCamera: (state, variant: CameraVariant) => ({
        ...state,
        variant: variant,
    }),

    shakeCamera: (state, intensity: number, time: number) => ({
        ...state,
        lastTimeShaked: time,
        shakeIntensity: intensity,
    }),
});
