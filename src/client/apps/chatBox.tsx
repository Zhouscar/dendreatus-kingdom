import { useBinding, useEffect } from "@rbxts/roact-hooked";
import { useMotion, useSpring } from "./hooks/ripple";
import { useBindingListener, useMotor, useTimeout } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { TextService } from "@rbxts/services";
import { useEnability, useEnabled } from "./hooks/enability";
import { makeDraftSafe } from "@rbxts/immut/src/makeDraftSafe";

export default function ChatBox(props: {
    index: number;
    message: string;
    textSize: number;
    font: Enum.Font;
}) {
    const index = props.index;
    const message = props.message;
    const textSize = props.textSize;
    const font = props.font;

    const enabled = useEnabled();
    const enability = useEnability();

    const indexSpring = useSpring(index);
    const [messageSpring, messageMotion] = useMotion(0);

    const [messageText, setMessageText] = useBinding("");
    // const [messageBounds, setMessageBounds] = useBinding(new Vector2(0, 0));
    const messageBounds = messageText.map((v) =>
        TextService.GetTextSize(" " + v + " ", textSize, font, new Vector2(100000, 1)).add(
            new Vector2(0, 6),
        ),
    );

    const labelPosition = indexSpring.map((v) => new UDim2(0.5, 0, 0.5, -v * 25));
    const labelSize = messageBounds.map((v) => new UDim2(0, v.X, 0, v.Y));
    const labelTransparency = useSpring(index / 3 + (enabled ? 0.2 : 1));

    useBindingListener(messageSpring, (value) => {
        const entireLength = message.size();
        const shownLength = math.ceil(entireLength * value);
        const currentMessage = message.sub(0, shownLength);
        setMessageText("  " + currentMessage);
    });

    // useEffect(() => {
    //     setMessageBounds(bounds);
    // }, [messageText, textSize, font]);

    useTimeout(() => {
        const length = message.size();
        messageMotion.set(0);
        messageMotion.linear(1, { speed: 20 / length });
    }, 0.5);

    return (
        <textlabel
            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            TextColor3={Color3.fromRGB(255, 255, 255)}
            Size={labelSize}
            Position={labelPosition}
            AnchorPoint={new Vector2(0.5, 1)}
            BackgroundTransparency={labelTransparency}
            TextTransparency={labelTransparency}
            TextStrokeTransparency={1}
            Text={messageText}
            Font={font}
            TextXAlignment={"Left"}
            TextSize={textSize}
            BorderSizePixel={0}
        >
            <uicorner CornerRadius={new UDim(0, 10)} />
        </textlabel>
    );
}
