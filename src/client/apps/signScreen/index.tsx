import Roact from "@rbxts/roact";
import Transition from "../components/transition";
import useComponent from "../hooks/useComponent";
import { ReadingSign } from "shared/components/signs";
import { useCallback, useMemo, useState } from "@rbxts/roact-hooked";
import { SIGN_CONTEXTS } from "shared/features/signs/contexts";
import { useSpring } from "../hooks/ripple";
import { playSound } from "shared/effects/sounds";
import useLocalPlrE from "../hooks/useLocalPlrE";
import { useS } from "../hooks/useW";
import Button from "../components/button";

export default function SignScreen(props: { enabled: boolean }) {
    const localPlrE = useLocalPlrE();
    const readingSign = useComponent(localPlrE, ReadingSign);

    const enabled = props.enabled;

    const s = useS();

    const [hovering, setHovering] = useState(false);

    const buttonBackgroundColor = useSpring(
        hovering ? Color3.fromRGB(255, 255, 255) : Color3.fromRGB(0, 0, 0),
    );
    const buttonTextColor = useSpring(
        hovering ? Color3.fromRGB(0, 0, 0) : Color3.fromRGB(255, 255, 255),
    );

    const hover = useCallback(() => {
        playSound({ soundName: "buttonHover" });
        setHovering(true);
    }, []);

    const unhover = useCallback(() => {
        setHovering(false);
    }, []);

    const clicked = useCallback(() => {
        s.clientState = "game";
    }, []);

    const signContext = useMemo(() => {
        if (readingSign === undefined) return undefined;
        return SIGN_CONTEXTS.get(readingSign.signCtor);
    }, [readingSign]);

    const elements: Roact.Element[] = [];
    signContext?.forEach((signElement) => {
        // TODO
        elements.push(
            <textlabel
                Size={new UDim2(1, 0, 0, signElement.heightPixels)}
                Text={signElement.text}
                TextSize={signElement.style === "title" ? 30 : 15}
                TextColor3={Color3.fromRGB(0, 0, 0)}
                BorderSizePixel={0}
                BackgroundTransparency={1}
                Font={"Fantasy"}
            />,
        );
    });

    return (
        <Transition enabled={enabled}>
            <frame
                BorderSizePixel={0}
                BackgroundTransparency={0.5}
                ZIndex={1}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                Size={new UDim2(1, 0, 1, 0)}
            />
            <frame
                ZIndex={2}
                BorderSizePixel={0}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                Position={new UDim2(0.5, 0, 0.5, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Size={new UDim2(0, 300, 0, 500)}
            >
                <Button
                    position={new UDim2(1, -10, 0, 10)}
                    anchorPoint={new Vector2(1, 0)}
                    size={new UDim2(0, 20, 0, 20)}
                    clicked={clicked}
                    text={"X"}
                />
                <scrollingframe
                    BorderSizePixel={0}
                    BackgroundTransparency={1}
                    Position={new UDim2(0.5, 0, 1, -10)}
                    AnchorPoint={new Vector2(0.5, 1)}
                    Size={new UDim2(1, -20, 1, -50)}
                    CanvasSize={new UDim2(1, 0, 0, 0)}
                    AutomaticCanvasSize={"Y"}
                    ScrollBarThickness={0}
                >
                    {elements}
                    <uilistlayout SortOrder={"Name"} FillDirection={"Vertical"} />
                </scrollingframe>
            </frame>
        </Transition>
    );
}
