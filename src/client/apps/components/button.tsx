import Roact from "@rbxts/roact";
import { useSpring } from "../hooks/ripple";
import { useEffect, useState } from "@rbxts/roact-hooked";
import { playSound } from "shared/effects/sounds";
import { useBindingListener } from "@rbxts/pretty-roact-hooks";

export default function Button(props: {
    clicked: () => void;
    size?: UDim2 | Roact.Binding<UDim2>;
    anchorPoint?: Vector2 | Roact.Binding<Vector2>;
    position?: UDim2 | Roact.Binding<UDim2>;
    font?: Enum.Font;
    textSize?: number | Roact.Binding<number>;
    text?: string;
    neutralButtonColor?: Color3;
    neutralTextColor?: Color3;
    neutralTextStrokeColor?: Color3;
    neutralTransparency?: number;
    hoverButtonColor?: Color3;
    hoverTextColor?: Color3;
    hoverTextStrokeColor?: Color3;
    hoverTransparency?: number;
    pressButtonColor?: Color3;
    pressTextColor?: Color3;
    pressTextStrokeColor?: Color3;
    pressTransparency?: number;
}) {
    const clicked = props.clicked;

    const size = props.size;
    const anchorPoint = props.anchorPoint;
    const position = props.position;

    const text = props.text ?? "";
    const font = props.font ?? "Fantasy";
    const textSize = props.textSize ?? 20;

    const neutralButtonColor = props.neutralButtonColor ?? Color3.fromRGB(0, 0, 0);
    const neutralTextColor = props.neutralTextColor ?? Color3.fromRGB(255, 255, 255);
    const neutralTextStrokeColor = props.neutralTextStrokeColor ?? Color3.fromRGB(0, 0, 0);
    const neutralTransparency = props.neutralTransparency ?? 0;

    const hoverButtonColor = props.hoverButtonColor ?? Color3.fromRGB(255, 255, 255);
    const hoverTextColor = props.hoverTextColor ?? Color3.fromRGB(0, 0, 0);
    const hoverTextStrokeColor = props.hoverTextStrokeColor ?? Color3.fromRGB(0, 0, 0);
    const hoverTransparency = props.hoverTransparency ?? 0;

    const pressButtonColor = props.pressButtonColor ?? Color3.fromRGB(0, 0, 0);
    const pressTextColor = props.pressTextColor ?? Color3.fromRGB(255, 255, 255);
    const pressTextStrokeColor = props.pressTextStrokeColor ?? Color3.fromRGB(0, 0, 0);
    const pressTransparency = props.pressTransparency ?? 0;

    const [press, setPress] = useState(false);
    const [hover, setHover] = useState(false);

    const buttonColor = useSpring(
        press ? pressButtonColor : hover ? hoverButtonColor : neutralButtonColor,
    );

    const textColor = useSpring(press ? pressTextColor : hover ? hoverTextColor : neutralTextColor);

    const textStrokeColor = useSpring(
        press ? pressTextStrokeColor : hover ? hoverTextStrokeColor : neutralTextStrokeColor,
    );

    const transparency = useSpring(
        press ? pressTransparency : hover ? hoverTransparency : neutralTransparency,
    );

    return (
        <textbutton
            AutoButtonColor={false}
            Font={font}
            TextSize={textSize}
            Size={size}
            Text={text}
            AnchorPoint={anchorPoint}
            Position={position}
            BackgroundColor3={buttonColor}
            TextColor3={textColor}
            TextStrokeColor3={textStrokeColor}
            BackgroundTransparency={transparency}
            BorderSizePixel={0}
            Event={{
                MouseEnter: () => {
                    setHover(true);
                    playSound({ soundName: "buttonHover" });
                },
                MouseLeave: () => {
                    setHover(false);
                    setPress(false);
                },
                MouseButton1Down: () => {
                    setPress(true);
                    playSound({ soundName: "buttonClick" });
                },
                MouseButton1Up: () => {
                    setHover(false);
                },
                MouseButton1Click: clicked,
            }}
        />
    );
}
