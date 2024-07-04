import Roact from "@rbxts/roact";
import { EnabilityProvider } from "../contexts/enability";
import EntireScreen from "../components/entireScreen";
import useComponent from "../hooks/useComponent";
import { useLocalPlrE } from "../hooks/ecsSelectors";
import { ReadingSign } from "shared/components/signs";
import { useCallback, useMemo, useState } from "@rbxts/roact-hooked";
import { SIGN_CONTEXTS } from "shared/features/signs/contexts";
import { useEnability, useEnabled } from "../hooks/enability";
import { useSpring } from "../hooks/ripple";
import { playSound } from "shared/effects/sounds";
import { useSetClientState } from "../hooks/useW";

function App(props: {}) {
    const localPlrE = useLocalPlrE();
    const readingSign = useComponent(localPlrE, ReadingSign);

    const enabled = useEnabled();
    const enability = useEnability();

    const semiTransparency = useSpring(enabled ? 0.5 : 1);
    const transparency = useSpring(enabled ? 0 : 1);

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

    const setClientState = useSetClientState();

    const clicked = useCallback(() => {
        setClientState("game");
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
                TextTransparency={transparency}
                Font={"Fantasy"}
            />,
        );
    });

    return (
        <EntireScreen handleInset={true} superPositionEnability={enability}>
            <frame
                BorderSizePixel={0}
                BackgroundTransparency={semiTransparency}
                ZIndex={1}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                Size={new UDim2(1, 0, 1, 0)}
            />
            <frame
                ZIndex={2}
                BorderSizePixel={0}
                BackgroundTransparency={transparency}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                Position={new UDim2(0.5, 0, 0.5, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Size={new UDim2(0, 300, 0, 500)}
            >
                <textbutton
                    BackgroundTransparency={0}
                    Position={new UDim2(1, -10, 0, 10)}
                    AnchorPoint={new Vector2(1, 0)}
                    Size={new UDim2(0, 20, 0, 20)}
                    TextStrokeTransparency={1}
                    TextTransparency={transparency}
                    TextColor3={buttonTextColor}
                    AutoButtonColor={false}
                    BackgroundColor3={buttonBackgroundColor}
                    Font={"Fantasy"}
                    Event={{
                        MouseEnter: hover,
                        MouseLeave: unhover,
                        MouseButton1Click: enabled ? clicked : undefined,
                    }}
                    Text={"X"}
                >
                    <uicorner CornerRadius={new UDim(0, 10)} />
                </textbutton>
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
        </EntireScreen>
    );
}

export default function SignScreen(props: { enabled: boolean }) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App />
        </EnabilityProvider>
    );
}
