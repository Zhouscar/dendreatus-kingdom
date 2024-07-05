import { useBindingListener } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useState } from "@rbxts/roact-hooked";
import { adjustAtmosphere } from "shared/effects/lightings";
import { newGuid } from "shared/features/guidUtils";

export default function Atmosphere(props: {
    color?: Color3 | Roact.Binding<Color3>;
    decay?: Color3 | Roact.Binding<Color3>;
    density?: number | Roact.Binding<number>;
    glare?: number | Roact.Binding<number>;
    haze?: number | Roact.Binding<number>;
    offset?: number | Roact.Binding<number>;
}) {
    const [guid, _] = useState(newGuid());

    const color = props.color;
    const decay = props.decay;
    const density = props.density;
    const glare = props.glare;
    const haze = props.haze;
    const offset = props.offset;

    useBindingListener(color, (v) => {
        adjustAtmosphere(guid, { Color: v });
    });

    useBindingListener(decay, (v) => {
        adjustAtmosphere(guid, { Decay: v });
    });

    useBindingListener(density, (v) => {
        adjustAtmosphere(guid, { Density: v });
    });

    useBindingListener(glare, (v) => {
        adjustAtmosphere(guid, { Glare: v });
    });

    useBindingListener(haze, (v) => {
        adjustAtmosphere(guid, { Haze: v });
    });

    useBindingListener(offset, (v) => {
        adjustAtmosphere(guid, { Offset: v });
    });

    return <></>;
}
