import { useDebounceEffect, useEventListener } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";

import useComponent from "./hooks/useComponent";
import { Health } from "shared/components/health";
import { useMotion } from "./hooks/ripple";
import { AnyEntity } from "@rbxts/matter";
import { useBinding } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";

export default function HealthBar(props: {
    e: AnyEntity;
    showNumber: boolean;
    Size?: UDim2;
    Position?: UDim2;
    AnchorPoint?: Vector2;
}) {
    const showNumber = props.showNumber;

    const e = props.e;
    const health = useComponent(e, Health);

    const maximum = health?.maximum ?? 100;
    const current = health?.current ?? 100;

    const currentPerc = current / maximum;
    const [flashPerc, flashPercMotion] = useMotion(1);

    const [shake, setShake] = useBinding(new UDim2(0, 0, 0, 0));

    useEventListener(RunService.Heartbeat, () => {
        const now = os.clock();
        const shakeX = 40 * math.max(0.5 - currentPerc, 0) * math.noise(0.5, 1.5, now * 200);
        const shakeY = 40 * math.max(0.5 - currentPerc, 0) * math.noise(1.5, 0.5, now * 200);
        setShake(new UDim2(0, shakeX, 0, shakeY));
    });

    useDebounceEffect(
        () => {
            flashPercMotion.spring(currentPerc);
        },
        [current],
        { wait: 0.5 },
    );

    return (
        <frame
            Key={"HealthBar"}
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
