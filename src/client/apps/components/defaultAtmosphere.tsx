import { useBindingListener } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useState } from "@rbxts/roact-hooked";
import { adjustAtmosphere, adjustDefaultAtmosphere } from "shared/effects/lightings";
import { newGuid } from "shared/features/guidUtils";

export default function DefaultAtmosphere(props: {
    color?: Color3 | Roact.Binding<Color3>;
    decay?: Color3 | Roact.Binding<Color3>;
    density?: number | Roact.Binding<number>;
    glare?: number | Roact.Binding<number>;
    haze?: number | Roact.Binding<number>;
    offset?: number | Roact.Binding<number>;
}) {
    const color = props.color;
    const decay = props.decay;
    const density = props.density;
    const glare = props.glare;
    const haze = props.haze;
    const offset = props.offset;

    useBindingListener(color, (v) => {
        adjustDefaultAtmosphere({ Color: v });
    });

    useBindingListener(decay, (v) => {
        adjustDefaultAtmosphere({ Decay: v });
    });

    useBindingListener(density, (v) => {
        adjustDefaultAtmosphere({ Density: v });
    });

    useBindingListener(glare, (v) => {
        adjustDefaultAtmosphere({ Glare: v });
    });

    useBindingListener(haze, (v) => {
        adjustDefaultAtmosphere({ Haze: v });
    });

    useBindingListener(offset, (v) => {
        adjustDefaultAtmosphere({ Offset: v });
    });

    return <></>;
}
