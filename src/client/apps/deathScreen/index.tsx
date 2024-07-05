import Roact from "@rbxts/roact";
import Transition from "../components/transition";
import { routes } from "shared/network";
import useWait from "../hooks/useWait";
import SpringAtmosphere from "../components/springAtmosphere";
import Button from "../components/button";
import { useRemoteToken } from "../hooks/useW";
import useDeferred from "../hooks/useDeferred";
import { useEffect, useState } from "@rbxts/roact-hooked";
import useCoincidenceEffect from "../hooks/useCoincidenceEffect";
import { playSound } from "shared/effects/sounds";

export default function DeathScreen(props: { enabled: boolean }) {
    const enabled = props.enabled;
    const deferredEnabled = useDeferred(enabled);

    const remoteToken = useRemoteToken();

    const wait3 = useWait(3, [enabled]);
    const wait5 = useWait(5, [enabled]);
    const wait6 = useWait(6, [enabled]);

    const [willSpawn, setWillSpawn] = useState(false);
    const deferredWillSpawn = useDeferred(willSpawn);
    const waitWillSpawn = useWait(1, [willSpawn]);

    useCoincidenceEffect(() => {
        playSound({ soundName: "youDied" });
    }, [deferredEnabled, wait5]);

    useEffect(() => {
        setWillSpawn(false);
    }, [enabled]);

    useCoincidenceEffect(() => {
        routes.requestSpawn.send(remoteToken);
    }, [enabled, deferredWillSpawn, waitWillSpawn]);

    return (
        <>
            <SpringAtmosphere
                springOptions={{ frequency: 0.5 }}
                color={Color3.fromRGB(0, 0, 0)}
                density={enabled && wait3 ? 1 : 0}
                haze={enabled && wait3 ? 10 : 0}
            />
            <Transition enabled={enabled && willSpawn} zindex={4}>
                <frame
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Size={new UDim2(5, 0, 5, 0)}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                />
            </Transition>
            <Transition enabled={enabled && !willSpawn && wait5} springOptions={{ frequency: 1 }}>
                <textlabel
                    Key={"YouDied"}
                    Size={new UDim2(0, 500, 0, 100)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Position={new UDim2(0.5, 0, 0.1, 0)}
                    BackgroundTransparency={1}
                    BorderSizePixel={0}
                    Font={"Fantasy"}
                    TextSize={100}
                    TextColor3={Color3.fromRGB(255, 0, 0)}
                    Text={"You died"}
                >
                    <uistroke
                        ApplyStrokeMode={"Contextual"}
                        Color={Color3.fromRGB(0, 0, 0)}
                        Thickness={2}
                    />
                </textlabel>
            </Transition>
            <Transition enabled={enabled && !willSpawn && wait6} springOptions={{ frequency: 1 }}>
                <frame
                    Key={"Options"}
                    Size={new UDim2(0, 200, 0, 500)}
                    AnchorPoint={new Vector2(0.5, 0)}
                    Position={new UDim2(0.5, 0, 0.7, 0)}
                    BackgroundTransparency={1}
                    BorderSizePixel={0}
                >
                    <uilistlayout
                        FillDirection={"Vertical"}
                        VerticalAlignment={"Top"}
                        HorizontalAlignment={"Center"}
                        Padding={new UDim(0, 10)}
                    />
                    <Button
                        text={"Respawn"}
                        size={new UDim2(0, 200, 0, 50)}
                        clicked={() => {
                            setWillSpawn(true);
                        }}
                    />
                </frame>
            </Transition>
        </>
    );
}
