import { Spring } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import useSuperPosition from "./hooks/useSuperPosition";
import useComponent from "./hooks/useComponent";
import { Stomach } from "shared/components/hunger";
import { useEffect } from "@rbxts/roact-hooked";
import { useLocalPlrE } from "./hooks/ecsSelectors";
import { EnabilityProvider } from "./contexts/enability";
import { useSpring } from "./hooks/ripple";
import { useEnability } from "./hooks/enability";

function App(props: { Size?: UDim2; Position?: UDim2; AnchorPoint?: Vector2 }) {
    const enability = useEnability();
    const enabilityTransparency = enability.map((v) => 1 - v);

    const localPlrE = useLocalPlrE();
    const stomach = useComponent(localPlrE, Stomach);

    const maximum = stomach?.capacity ?? 100;
    const current = stomach?.hunger ?? 100;

    const currentPerc = useSpring(current / maximum);
    const rootPosition = useSuperPosition(enability, props.Position);

    return (
        <frame
            Key={"HungerBar"}
            Size={props.Size || new UDim2(0, 200, 0, 20)}
            Position={rootPosition}
            AnchorPoint={props.AnchorPoint}
            BorderSizePixel={0}
            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            Transparency={enabilityTransparency}
        >
            <frame
                Size={new UDim2(1, -3, 1, -3)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={new UDim2(0.5, 0, 0.5, 0)}
                BorderSizePixel={0}
                BackgroundTransparency={1}
            >
                <textlabel
                    ZIndex={4}
                    Position={new UDim2(0, -3, 0, 0)}
                    Size={new UDim2(1, 0, 1, 0)}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    TextXAlignment={"Right"}
                    TextStrokeTransparency={enabilityTransparency}
                    TextTransparency={enabilityTransparency}
                    BackgroundTransparency={1}
                    Text={tostring(math.floor(current))}
                    Font={"Fantasy"}
                    TextScaled={true}
                ></textlabel>
                <frame
                    ZIndex={3}
                    Position={new UDim2(0, 0, 0, 0)}
                    Size={currentPerc.map((v) => new UDim2(v, 0, 1, 0))}
                    BorderSizePixel={0}
                    BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                    Transparency={enabilityTransparency}
                >
                    <uigradient
                        Color={
                            new ColorSequence(Color3.fromRGB(150, 150, 0), Color3.fromRGB(0, 0, 0))
                        }
                        Rotation={90}
                        Offset={new Vector2(0, 0.5)}
                    ></uigradient>
                </frame>
            </frame>
        </frame>
    );
}

export default function HungerBar(props: {
    enabled: boolean;
    Size?: UDim2;
    Position?: UDim2;
    AnchorPoint?: Vector2;
}) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App Size={props.Size} Position={props.Position} AnchorPoint={props.AnchorPoint} />
        </EnabilityProvider>
    );
}