import { useBinding, useEffect, useState } from "@rbxts/roact-hooked";
import { useMotion, useSpring } from "./hooks/ripple";
import { useBindingListener, useTimeout } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { TextService } from "@rbxts/services";
import { AnyEntity } from "@rbxts/matter";
import useComponent from "./hooks/useComponent";
import { Transform } from "shared/components";
import { makeSoundInWorld } from "shared/effects/sounds";

export default function ChatBox(props: {
    e: AnyEntity;
    duration: number;
    index: number;
    message: string;
    textSize: number;
    font: Enum.Font;
}) {
    const e = props.e;
    const duration = props.duration;
    const index = props.index;
    const message = props.message;
    const textSize = props.textSize;
    const font = props.font;

    const transform = useComponent(e, Transform);

    const indexSpring = useSpring(index);
    const [messageSpring, messageMotion] = useMotion(0);

    const [messageText, setMessageText] = useBinding("");
    // const [messageBounds, setMessageBounds] = useBinding(new Vector2(0, 0));
    const messageBounds = messageText.map((v) =>
        TextService.GetTextSize(" " + v + " ", textSize, font, new Vector2(1000, 1)).add(
            new Vector2(0, 6),
        ),
    );

    const [timedOut, setTimedOut] = useState(false);

    const labelPosition = indexSpring.map((v) => new UDim2(0.5, 0, 0.5, -v * 25 - 20));
    const labelSize = messageBounds.map((v) => new UDim2(0, v.X, 0, v.Y));
    const labelTransparency = useSpring(index / 3 + 0.2 + (timedOut ? 1 : 0));

    useBindingListener(messageText, () => {
        if (transform === undefined) return;
        makeSoundInWorld(transform.cf, {
            soundName: "letterByLetter",
        });
    });

    const [hasPoped, setHasPoped] = useState(false);

    useEffect(() => {
        if (transform === undefined) return;
        if (hasPoped) return;
        setHasPoped(true);

        makeSoundInWorld(transform.cf, {
            soundName: "chatPopUp",
        });
    }, [transform, hasPoped]);

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

    useTimeout(() => {
        setTimedOut(true);
    }, duration);

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
