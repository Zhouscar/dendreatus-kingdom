import Roact from "@rbxts/roact";
import Transition from "../components/transition";
import useComponent from "../hooks/useComponent";
import { ReadingSign } from "shared/components/signs";
import { useCallback, useMemo } from "@rbxts/roact-hooked";
import { SIGN_CONTEXTS } from "shared/features/signs/contexts";
import useLocalPlrE from "../hooks/useLocalPlrE";
import useW from "../hooks/useW";
import Button from "../components/button";
import { Components } from "shared/components";
import { ComponentNames } from "shared/components/serde";

export default function SignScreen(props: { enabled: boolean }) {
    const localPlrE = useLocalPlrE();
    const readingSign = useComponent(localPlrE, ReadingSign);

    const enabled = props.enabled;

    const w = useW();

    const clicked = useCallback(() => {
        if (!w.contains(localPlrE)) return;
        w.remove(localPlrE, ReadingSign);
    }, [localPlrE]);

    const signContext = useMemo(() => {
        if (readingSign === undefined) return undefined;
        const Ctor = Components[readingSign.signComponentName as ComponentNames];
        return SIGN_CONTEXTS.get(Ctor);
    }, [readingSign]);

    const elements: Roact.Element[] = [];
    signContext?.forEach((signElement, i) => {
        elements.push(
            <textlabel
                LayoutOrder={i}
                TextWrap={true}
                Size={new UDim2(1, 0, 0, 0)}
                AutomaticSize={"Y"}
                Text={signElement.text}
                TextSize={signElement.style === "title" ? 30 : 15}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                BorderSizePixel={0}
                BackgroundTransparency={1}
                Font={"Fantasy"}
            />,
        );
    });

    return (
        <Transition enabled={enabled} key={"sign"}>
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
                Size={new UDim2(0.5, 0, 0.7, 0)}
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
                    ScrollingDirection={"Y"}
                    ScrollBarThickness={2}
                    ScrollBarImageColor3={Color3.fromRGB(50, 50, 50)}
                >
                    {elements}
                    <uilistlayout SortOrder={"LayoutOrder"} FillDirection={"Vertical"} />
                </scrollingframe>
            </frame>
        </Transition>
    );
}
