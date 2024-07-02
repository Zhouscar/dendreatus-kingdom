import Roact from "@rbxts/roact";
import { EnabilityProvider } from "./contexts/enability";
import { useEnability, useEnabled } from "./hooks/enability";
import EntireScreen from "./components/entireScreen";
import { useCallback, useEffect, useRef } from "@rbxts/roact-hooked";
import { RunService, UserInputService } from "@rbxts/services";
import { useLocalPlrE } from "./hooks/ecsSelectors";
import useW, { useSetClientState } from "./hooks/useW";
import { ChattingRaw } from "shared/components";
import { useEventListener, useLatest } from "@rbxts/pretty-roact-hooks";
import { useSpring } from "./hooks/ripple";

const MAX_MESSAGE_LENGTH = 50;

function App(props: {}) {
    const enabled = useEnabled();
    const enability = useEnability();
    const textboxRef = useRef<TextBox>();
    const latestEnabled = useLatest(enabled);

    const transparency = useSpring(enabled ? 0.2 : 1);

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

        w.insert(localPlrE, ChattingRaw({ message: text }));
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
        <EntireScreen superPositionEnability={enability}>
            <textbox
                ClearTextOnFocus={false}
                Size={new UDim2(0, 300, 0, 20)}
                Position={new UDim2(0.5, 0, 1, -100)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Ref={textboxRef}
                Font={"Fantasy"}
                TextSize={12}
                BackgroundTransparency={transparency}
                TextTransparency={transparency}
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
        </EntireScreen>
    );
}

export default function ChatScreen(props: { enabled: boolean }) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App />
        </EnabilityProvider>
    );
}
