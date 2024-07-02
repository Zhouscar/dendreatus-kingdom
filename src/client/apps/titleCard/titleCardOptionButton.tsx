import Roact from "@rbxts/roact";
import { useCallback, useEffect, useState } from "@rbxts/roact-hooked";
import { useSpring } from "../hooks/ripple";
import { playSound } from "shared/effects/sounds";

export default function TitleCardOptionButton(props: {
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

    const hoveringTransparency = hovering.map((v) => 1 - v);
    const enabilityTransparency = enability.map((v) => 1 - v);
    const textColor = hovering.map((v) => new Color3(1 - v, 1 - v, 1 - v));

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
            BackgroundColor3={Color3.fromRGB(255, 255, 255)}
            BorderSizePixel={0}
            Text={text}
            TextSize={30}
            TextColor3={textColor}
            Active={enabled}
            TextTransparency={enabilityTransparency}
            Font={"Fantasy"}
        >
            <uicorner CornerRadius={new UDim(0, 10)} />
            <uistroke
                Thickness={1}
                ApplyStrokeMode={"Contextual"}
                Transparency={enabilityTransparency}
            />
        </textbutton>
    );
}
