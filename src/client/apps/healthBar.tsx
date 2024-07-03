import { useDebounceEffect } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import useSuperPosition from "./hooks/useSuperPosition";
import useComponent from "./hooks/useComponent";
import { Health } from "shared/components/health";
import { useLocalPlrE } from "./hooks/ecsSelectors";
import { EnabilityProvider } from "./contexts/enability";
import { useMotion } from "./hooks/ripple";
import { useEnability } from "./hooks/enability";
import { AnyEntity } from "@rbxts/matter";
import { useEffect } from "@rbxts/roact-hooked";

function App(props: { e: AnyEntity; Size?: UDim2; Position?: UDim2; AnchorPoint?: Vector2 }) {
    const enability = useEnability();
    const enabilityTransparency = enability.map((v) => 1 - v);

    const e = props.e;
    const health = useComponent(e, Health);

    const maximum = health?.maximum ?? 100;
    const current = health?.current ?? 100;

    const currentPerc = current / maximum;
    const [flashPerc, flashPercMotion] = useMotion(1);

    const rootPosition = useSuperPosition(enability, props.Position);

    useDebounceEffect(
        () => {
            flashPercMotion.set(currentPerc);
        },
        [current],
        { wait: 0.5 },
    );

    return (
        <frame
            Key={"HealthBar"}
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
                {props.Size !== undefined && props.Size.Height.Offset < 15 ? undefined : (
                    <textlabel
                        ZIndex={4}
                        Position={new UDim2(0, 3, 0, 0)}
                        Size={new UDim2(1, 0, 1, 0)}
                        TextColor3={Color3.fromRGB(255, 255, 255)}
                        TextXAlignment={"Left"}
                        TextStrokeTransparency={enabilityTransparency}
                        TextTransparency={enabilityTransparency}
                        BackgroundTransparency={1}
                        Text={tostring(current)}
                        Font={"Fantasy"}
                        TextScaled={true}
                    />
                )}
                <frame
                    ZIndex={3}
                    Position={new UDim2(0, 0, 0, 0)}
                    Size={new UDim2(currentPerc, 0, 1, 0)}
                    BorderSizePixel={0}
                    BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                    Transparency={enabilityTransparency}
                >
                    <uigradient
                        Color={
                            new ColorSequence(Color3.fromRGB(150, 0, 0), Color3.fromRGB(0, 0, 0))
                        }
                        Rotation={90}
                        Offset={new Vector2(0, 0.5)}
                    />
                </frame>
                <frame
                    ZIndex={2}
                    Position={new UDim2(0, 0, 0, 0)}
                    Size={flashPerc.map((v) => new UDim2(v, 0, 1, 0))}
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

export default function HealthBar(props: {
    e: AnyEntity;
    enabled: boolean;
    Size?: UDim2;
    Position?: UDim2;
    AnchorPoint?: Vector2;
}) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App
                e={props.e}
                Size={props.Size}
                Position={props.Position}
                AnchorPoint={props.AnchorPoint}
            />
        </EnabilityProvider>
    );
}
