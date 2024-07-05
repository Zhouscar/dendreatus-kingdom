import { SpringOptions } from "@rbxts/ripple";
import { useSpring } from "../hooks/ripple";
import Atmosphere from "./atmosphere";
import Roact from "@rbxts/roact";

export default function SpringAtmosphere(props: {
    springOptions?: SpringOptions;
    color?: Color3;
    decay?: Color3;
    density?: number;
    glare?: number;
    haze?: number;
    offset?: number;
}) {
    const springOptions = props.springOptions;

    const color = props.color ?? Color3.fromRGB(199, 170, 107);
    const decay = props.decay ?? Color3.fromRGB(92, 60, 13);
    const density = props.density ?? 0.395;
    const glare = props.glare ?? 0;
    const haze = props.haze ?? 0;
    const offset = props.offset ?? 0;

    const colorSpring = useSpring(color, springOptions);
    const decaySpring = useSpring(decay, springOptions);
    const densitySpring = useSpring(density, springOptions);
    const glareSpring = useSpring(glare, springOptions);
    const hazeSpring = useSpring(haze, springOptions);
    const offsetSpring = useSpring(offset, springOptions);

    return (
        <Atmosphere
            color={colorSpring}
            decay={decaySpring}
            density={densitySpring}
            glare={glareSpring}
            haze={hazeSpring}
            offset={offsetSpring}
        />
    );
}
