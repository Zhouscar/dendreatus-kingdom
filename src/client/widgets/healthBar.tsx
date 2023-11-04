import { Spring, useDebounceEffect, useMotor } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";

function HealthBar(props: {
    Size?: UDim2 | Roact.Binding<UDim2>;
    Position?: UDim2 | Roact.Binding<UDim2>;
    AnchorPoint?: Vector2 | Roact.Binding<Vector2>;

    maximum: number;
    current: number;
}) {
    const maximum = props.maximum;
    const current = props.current;

    const currentPerc = current / maximum;
    const [flashPerc, setFlashPerc] = useMotor(1);

    useDebounceEffect(
        () => {
            setFlashPerc(new Spring(currentPerc));
        },
        [current],
        { wait: 0.5 },
    );

    return (
        <frame
            Size={props.Size || new UDim2(0, 200, 0, 20)}
            Position={props.Position}
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
                <textlabel
                    ZIndex={4}
                    Position={new UDim2(0, -3, 0, 0)}
                    Size={new UDim2(1, 0, 1, 0)}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    TextStrokeTransparency={0}
                    TextXAlignment={"Right"}
                    BackgroundTransparency={1}
                    Text={tostring(current)}
                    Font={"Fantasy"}
                    TextScaled={true}
                ></textlabel>
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
                    ></uigradient>
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

export = HealthBar;
