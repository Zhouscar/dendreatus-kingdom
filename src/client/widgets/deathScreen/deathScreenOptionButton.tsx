import { Spring, useMotor } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useCallback, useEffect, useState } from "@rbxts/roact-hooked";

export default function DeathScreenOptionButton(props: {
    enabled: boolean;
    text: string;
    onClick: () => void;
}) {
    const enabled = props.enabled;
    const text = props.text;
    const onClick = props.onClick;

    const [enabledMotor, setEnabledMotor] = useMotor(0);
    const [hoveringMotor, setHoveringMotor] = useMotor(0);

    const hoveringTransparency = hoveringMotor.map((v) => 1 - v);
    const enabledTransparency = enabledMotor.map((v) => 1 - v);
    const textColor = hoveringMotor.map((v) => new Color3(1 - v, 0, 0));

    useEffect(() => {
        setEnabledMotor(new Spring(enabled ? 1 : 0, { frequency: 1 }));
        if (!enabled) {
            setHoveringMotor(new Spring(0));
        }
    }, [enabled]);

    const mouseEnter = useCallback(() => {
        setHoveringMotor(new Spring(1));
    }, []);
    const mouseLeave = useCallback(() => {
        setHoveringMotor(new Spring(0));
    }, []);

    return (
        <textbutton
            Size={new UDim2(0, 200, 0, 50)}
            AutoButtonColor={false}
            Event={{
                MouseEnter: enabled ? mouseEnter : undefined,
                MouseLeave: enabled ? mouseLeave : undefined,
                MouseButton1Click: enabled ? onClick : undefined,
            }}
            BackgroundTransparency={hoveringTransparency}
            BackgroundColor3={Color3.fromRGB(255, 0, 0)}
            BorderSizePixel={0}
            Text={text}
            TextSize={30}
            TextColor3={textColor}
            Active={enabled}
            TextTransparency={enabledTransparency}
            Font={"Fantasy"}
        >
            <uicorner CornerRadius={new UDim(0, 10)}></uicorner>
            <uistroke
                Thickness={1}
                ApplyStrokeMode={"Contextual"}
                Transparency={enabledTransparency}
            ></uistroke>
        </textbutton>
    );
}
