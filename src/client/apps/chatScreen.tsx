import Roact from "@rbxts/roact";
import Transition from "./components/transition";
import { useCallback, useEffect, useRef } from "@rbxts/roact-hooked";
import { RunService, UserInputService } from "@rbxts/services";
import useW, { useS } from "./hooks/useW";
import { ChattingRaw } from "shared/components";
import { useEventListener, useLatest } from "@rbxts/pretty-roact-hooks";
import { useSpring } from "./hooks/ripple";
import useLocalPlrE from "./hooks/useLocalPlrE";
import useSetClientState from "./hooks/useSetClientState";

const MAX_MESSAGE_LENGTH = 50;

export default function ChatScreen(props: { enabled: boolean }) {
    const enabled = props.enabled;
    const textboxRef = useRef<TextBox>();
    const latestEnabled = useLatest(enabled);

    const localPlrE = useLocalPlrE();

    const setClientState = useSetClientState();
    const w = useW();

    const entered = useCallback(() => {
        if (!enabled) return;
        const textbox = textboxRef.getValue();
        if (textbox === undefined) return;
        if (!UserInputService.IsKeyDown("Return")) {
            textbox.CaptureFocus();
            return;
        }
        const text = textbox.Text;
        if (text.size() === 0) return;
        if (localPlrE === undefined) return;

        textbox.Text = "";

        setClientState("game");

        if (w.contains(localPlrE)) {
            w.insert(localPlrE, ChattingRaw({ message: text }));
        }
    }, [enabled, localPlrE, w]);

    useEventListener(RunService.Heartbeat, () => {
        const textbox = textboxRef.getValue();
        if (textbox !== undefined) {
            if (textbox.Text.size() <= MAX_MESSAGE_LENGTH) return;
            textbox.Text = textbox.Text.sub(0, MAX_MESSAGE_LENGTH);
        }
    });

    useEffect(() => {
        if (enabled) {
            textboxRef.getValue()?.CaptureFocus();
        } else {
            textboxRef.getValue()?.ReleaseFocus();
        }
    }, [enabled]);

    return (
        <Transition enabled={enabled} enabledTransparency={0.2}>
            <textbox
                ClearTextOnFocus={false}
                Size={new UDim2(0, 300, 0, 30)}
                Position={new UDim2(0.5, 0, 1, -100)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Ref={textboxRef}
                Font={"Fantasy"}
                TextSize={16}
                Text={""}
                PlaceholderText={"Type here to chat..."}
                PlaceholderColor3={Color3.fromRGB(100, 100, 100)}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                BorderSizePixel={0}
                Event={{
                    FocusLost: entered,
                }}
            >
                <uicorner CornerRadius={new UDim(0, 10)} />
            </textbox>
        </Transition>
    );
}
