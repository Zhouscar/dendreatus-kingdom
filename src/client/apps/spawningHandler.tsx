import Roact from "@rbxts/roact";
import Transition from "./components/transition";
import { useTimeout } from "@rbxts/pretty-roact-hooks";
import { useBinding, useEffect, useRef } from "@rbxts/roact-hooked";
import useComponent from "./hooks/useComponent";
import { Animatable } from "shared/components";
import { startAnimation } from "shared/effects/animations";
import { playSound } from "shared/effects/sounds";
import useLocalPlrE from "./hooks/useLocalPlrE";
import useSetClientState from "./hooks/useSetClientState";
import useWait from "./hooks/useWait";
import useCoincidenceEffect from "./hooks/useCoincidenceEffect";
import useDeferred from "./hooks/useDeferred";

export default function SpawningHandler(props: { enabled: boolean }) {
    const enabled = props.enabled;
    const deferredEnabled = useDeferred(enabled);

    const localPlrE = useLocalPlrE();
    const setClientState = useSetClientState();

    const animatable = useComponent(localPlrE, Animatable);

    const wait9 = useWait(9, [enabled]);
    const wait20 = useWait(20, [enabled]);

    useEffect(() => {
        if (!enabled) return;
        playSound({ soundName: "wakeUpFromTrauma" });
    }, [deferredEnabled]);

    useCoincidenceEffect(() => {
        startAnimation(animatable!.animator, "wakingUpFromTrauma", "Action3", 0);
    }, [deferredEnabled, animatable !== undefined]);

    useCoincidenceEffect(() => {
        startAnimation(animatable!.animator, "wakingUpFromTrauma", "Action3");
    }, [deferredEnabled, wait9, animatable !== undefined]);

    useCoincidenceEffect(() => {
        setClientState("game");
    }, [deferredEnabled, wait20]);

    return (
        <Transition enabled={enabled && !wait9}>
            <frame
                Size={new UDim2(5, 0, 5, 0)}
                Position={new UDim2(0.5, 0, 0.5, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            />
        </Transition>
    );
}
