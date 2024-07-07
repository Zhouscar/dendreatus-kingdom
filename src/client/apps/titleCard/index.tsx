import Roact from "@rbxts/roact";
import Transition from "../components/transition";
import { useEffect, useState } from "@rbxts/roact-hooked";
import { loopSound, playSound } from "shared/effects/sounds";
import useWait from "../hooks/useWait";
import { useRemoteToken } from "../hooks/useW";
import SpringLoopedSound from "../components/springLoopedSound";
import Button from "../components/button";
import { routes } from "shared/network";
import useCoincidenceEffect from "../hooks/useCoincidenceEffect";
import useDeferred from "../hooks/useDeferred";

export default function TitleCard(props: { enabled: boolean }) {
    const enabled = props.enabled;
    const deferredEnabled = useDeferred(enabled);

    const wait1 = useWait(1, [enabled]);
    const wait3 = useWait(3, [enabled]);
    const wait4 = useWait(4, [enabled]);
    const wait5 = useWait(5, [enabled]);
    const wait6 = useWait(6, [enabled]);

    const [willSpawn, setWillSpawn] = useState(false);
    const deferredWillSpawn = useDeferred(willSpawn);
    const waitWillSpawn = useWait(3, [willSpawn]);

    const remoteToken = useRemoteToken();

    useEffect(() => {
        setWillSpawn(false);
    }, [deferredEnabled]);

    useEffect(() => {
        if (!willSpawn) return;
        playSound({ soundName: "startGame" });
    }, [willSpawn]);

    useCoincidenceEffect(() => {
        loopSound({ soundName: "dkTheme", timePosition: 0 });
    }, [deferredEnabled, wait5]);

    useCoincidenceEffect(() => {
        routes.requestSpawn.send(remoteToken);
    }, [deferredEnabled, deferredWillSpawn, waitWillSpawn]);

    return (
        <>
            <SpringLoopedSound
                soundName={"dkTheme"}
                volume={enabled && !willSpawn && wait5 ? 1 : 0}
                timePosition={enabled ? 0 : undefined}
            />
            <Transition enabled={enabled && (willSpawn || !wait4)} zindex={3}>
                <frame
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Size={new UDim2(5, 0, 5, 0)}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                />
            </Transition>
            <Transition enabled={enabled && !willSpawn && wait1 && !wait3} zindex={4}>
                <textlabel
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Size={new UDim2(1, 0, 1, 0)}
                    BackgroundTransparency={1}
                    TextXAlignment={"Center"}
                    TextYAlignment={"Center"}
                    Text={"Golden Isles of Dendraetus Presents"}
                    TextSize={30}
                    Font={"Fantasy"}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    TextStrokeTransparency={1}
                />
            </Transition>
            <Transition enabled={enabled && !willSpawn && wait5}>
                <textlabel
                    Key={"Title"}
                    Size={new UDim2(0.5, 0, 0.2, 0)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Position={new UDim2(0.5, 0, 0.3, 0)}
                    BackgroundTransparency={1}
                    BorderSizePixel={0}
                    TextScaled={true}
                    Font={"Fantasy"}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    Text={"Dendraetus Kingdom"}
                >
                    <uistroke
                        ApplyStrokeMode={"Contextual"}
                        Color={Color3.fromRGB(0, 0, 0)}
                        Thickness={2}
                    />
                </textlabel>
            </Transition>
            <Transition enabled={enabled && wait6}>
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
                        text={"Start"}
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
