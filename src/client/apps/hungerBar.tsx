import Roact from "@rbxts/roact";
import useSuperSize from "./hooks/useSuperPosition";
import useComponent from "./hooks/useComponent";
import { Stomach } from "shared/components/hunger";
import { useSpring } from "./hooks/ripple";
import { AnyEntity } from "@rbxts/matter";
import { useBinding } from "@rbxts/roact-hooked";
import { useEventListener } from "@rbxts/pretty-roact-hooks";
import { RunService } from "@rbxts/services";
import gameTime from "shared/hooks/gameTime";

export default function HungerBar(props: {
    e: AnyEntity;
    showNumber: boolean;
    Size?: UDim2;
    Position?: UDim2;
    AnchorPoint?: Vector2;
}) {
    const showNumber = props.showNumber;

    const e = props.e;
    const stomach = useComponent(e, Stomach);

    const maximum = stomach?.capacity ?? 100;
    const current = stomach?.hunger ?? 100;

    const currentPerc = current / maximum;
    const currentPercSpring = useSpring(current / maximum);

    const [shake, setShake] = useBinding(new UDim2(0, 0, 0, 0));

    useEventListener(RunService.Heartbeat, () => {
        const now = gameTime();
        const shakeX = 40 * math.max(0.5 - currentPerc, 0) * math.noise(0.5, 1.5, now * 200);
        const shakeY = 40 * math.max(0.5 - currentPerc, 0) * math.noise(1.5, 0.5, now * 200);
        setShake(new UDim2(0, shakeX, 0, shakeY));
    });

    return (
        <frame
            Key={"HungerBar"}
            Size={props.Size || new UDim2(0, 200, 0, 20)}
            Position={shake.map((v) => v.add(props.Position ?? new UDim2(0, 0, 0, 0)))}
            AnchorPoint={props.AnchorPoint}
            BorderSizePixel={0}
            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
        >
            <frame
                Size={new UDim2(1, -3, 1, -3)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={new UDim2(0.5, 0, 0.5, 0)}
                BorderSizePixel={0}
                BackgroundTransparency={1}
            >
                {!showNumber ? undefined : (
                    <textlabel
                        ZIndex={4}
                        Position={new UDim2(0, 3, 0, 0)}
                        Size={new UDim2(1, 0, 1, 0)}
                        TextColor3={Color3.fromRGB(255, 255, 255)}
                        TextXAlignment={"Left"}
                        BackgroundTransparency={1}
                        Text={tostring(math.floor(current))}
                        Font={"Fantasy"}
                        TextScaled={true}
                    />
                )}
                <frame
                    ZIndex={3}
                    Position={new UDim2(0, 0, 0, 0)}
                    Size={currentPercSpring.map((v) => new UDim2(v, 0, 1, 0))}
                    BorderSizePixel={0}
                    BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                >
                    <uigradient
                        Color={
                            new ColorSequence(Color3.fromRGB(150, 150, 0), Color3.fromRGB(0, 0, 0))
                        }
                        Rotation={90}
                        Offset={new Vector2(0, 0.5)}
                    />
                </frame>
            </frame>
        </frame>
    );
}
