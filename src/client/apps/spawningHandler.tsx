import Roact from "@rbxts/roact";
import Transition from "./components/transition";
import { useEffect } from "@rbxts/roact-hooked";
import useComponent from "./hooks/useComponent";
import { Animatable, Transform } from "shared/components";
import { startAnimation } from "shared/effects/animations";
import { makeSoundInWorld, playSound } from "shared/effects/sounds";
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
    const transform = useComponent(localPlrE, Transform);

    const wait9 = useWait(9, [enabled]);
    const wait20 = useWait(20, [enabled]);

    useCoincidenceEffect(() => {
        makeSoundInWorld(transform!.cf, { soundName: "wakeUpFromTrauma" });
    }, [deferredEnabled, transform !== undefined]);

    useCoincidenceEffect(() => {
        startAnimation(animatable!.animator, "wakingUpFromTrauma", "Action3", true, 0);
    }, [deferredEnabled, animatable !== undefined]);

    useCoincidenceEffect(() => {
        startAnimation(animatable!.animator, "wakingUpFromTrauma", "Action3");
    }, [deferredEnabled, wait9, animatable !== undefined]);

    useCoincidenceEffect(() => {
        setClientState("game");
    }, [deferredEnabled, wait20]);

    return (
        <Transition enabled={enabled && !wait9} springOptions={"instant"}>
            <frame
                Size={new UDim2(5, 0, 5, 0)}
                Position={new UDim2(0.5, 0, 0.5, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            />
        </Transition>
    );
}
