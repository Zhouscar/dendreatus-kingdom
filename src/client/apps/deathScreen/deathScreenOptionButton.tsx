import { Spring } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useCallback, useEffect, useState } from "@rbxts/roact-hooked";
import { useSpring } from "../hooks/ripple";
import { playSound } from "shared/effects/sounds";

export default function DeathScreenOptionButton(props: {
    enabled: boolean;
    text: string;
    onClick: () => void;
}) {
    const enabled = props.enabled;
    const text = props.text;
    const onClick = props.onClick;

    const enability = useSpring(enabled ? 1 : 0, { frequency: 1 });

    const size = enability.map((v) => (v > 0 ? new UDim2(0, 200, 0, 50) : new UDim2(0, 0, 0, 0)));

    const [isHovering, setIsHovering] = useState(false);
    const hovering = useSpring(isHovering ? 1 : 0);

    const hoveringTransparency = useSpring(enabled ? (isHovering ? 0 : 0.5) : 1);
    const enabilityTransparency = enability.map((v) => 1 - v);
    const textColor = hovering.map((v) => new Color3(1 - v, 0, 0));
    const buttonColor = hovering.map((v) => new Color3(v, 0, 0));

    useEffect(() => {
        if (!enabled) {
            setIsHovering(false);
        }
    }, [enabled]);

    const mouseEnter = useCallback(() => {
        setIsHovering(true);
        playSound({ soundName: "buttonHover" });
    }, []);
    const mouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    return (
        <textbutton
            Size={size}
            AutoButtonColor={false}
            Event={{
                MouseEnter: enabled ? mouseEnter : undefined,
                MouseLeave: enabled ? mouseLeave : undefined,
                MouseButton1Click: enabled ? onClick : undefined,
            }}
            BackgroundTransparency={hoveringTransparency}
            BackgroundColor3={buttonColor}
            BorderSizePixel={0}
            Text={text}
            TextSize={30}
            TextColor3={textColor}
            Active={enabled}
            TextTransparency={enabilityTransparency}
            Font={"Fantasy"}
        >
            <uicorner CornerRadius={new UDim(0, 10)}></uicorner>
            <uistroke
                Thickness={1}
                ApplyStrokeMode={"Contextual"}
                Transparency={enabilityTransparency}
            ></uistroke>
        </textbutton>
    );
}
