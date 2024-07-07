import { SpringOptions } from "@rbxts/ripple";
import { useSpring } from "../hooks/ripple";
import Roact from "@rbxts/roact";
import Blur from "./blur";

export default function SpringBlur(props: { springOptions?: SpringOptions; size?: number }) {
    const springOptions = props.springOptions;

    const size = props.size;
    const sizeSpring = useSpring(size ?? 0, springOptions);

    return <Blur size={sizeSpring} />;
}
