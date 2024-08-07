import Roact from "@rbxts/roact";
import useSuperPosition from "../hooks/useSuperPosition";
import { SpringOptions } from "@rbxts/ripple";
import { useSpring } from "../hooks/ripple";
import useBindingOf from "../hooks/useBindingOf";
import useMenuOpened from "../hooks/useMenuOpened";

export default function Transition(
    props: Roact.PropsWithChildren & {
        enabled: boolean;
        zindex?: number;
        enabledTransparency?: number;
        springOptions?: SpringOptions | "instant";
        key?: string;
    },
) {
    const menuOpened = useMenuOpened();

    const enabled = props.enabled && !menuOpened;
    const springOptions = props.springOptions;
    const key = props.key;
    const enabledTransparency = props.enabledTransparency ?? 0;
    const zindex = props.zindex;

    const transparencySpring = useSpring(
        enabled ? enabledTransparency : 1,
        springOptions !== "instant" ? springOptions : undefined,
    );
    const enabilitySpring = useSpring(
        enabled ? 1 : 0,
        springOptions !== "instant" ? springOptions : undefined,
    );

    const transarencyInstant = useBindingOf(enabled ? enabledTransparency : 1);
    const enabilityInstant = useBindingOf(enabled ? 1 : 0);

    const position = useSuperPosition(
        springOptions !== "instant" ? enabilitySpring : enabilityInstant,
    );

    return (
        <canvasgroup
            Key={key ?? "Canvas"}
            Position={position}
            Size={new UDim2(1, 0, 1, 0)}
            BorderSizePixel={0}
            BackgroundTransparency={1}
            // Active={enabled}
            GroupTransparency={
                springOptions !== "instant" ? transparencySpring : transarencyInstant
            }
            ZIndex={zindex}
        >
            {props[Roact.Children]}
        </canvasgroup>
    );
}
