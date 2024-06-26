import Roact from "@rbxts/roact";
import { EnabilityProvider } from "./contexts/enability";
import EntireScreen from "./components/entireScreen";
import { useEnability, useEnabled } from "./hooks/enability";
import { useTimeout } from "@rbxts/pretty-roact-hooks";
import { useBinding, useEffect, useRef } from "@rbxts/roact-hooked";
import { useLocalPlrE } from "./hooks/ecsSelectors";
import useComponent from "./hooks/useComponent";
import { Animatable } from "shared/components";
import { startAnimation } from "shared/effects/animations";
import useW, { useSetClientState } from "./hooks/useW";
import { SoundService } from "@rbxts/services";
import { SOUND_IDS } from "shared/features/ids/sounds";
import { Make } from "@rbxts/altmake";

const spawningSound = Make("Sound", {
    SoundId: SOUND_IDS.wakeUpFromTrauma,
    Name: "SpawningSound",
    Parent: SoundService,
});

function App(props: {}) {
    const w = useW();
    const enabled = useEnabled();
    const enability = useEnability();

    const localPlrE = useLocalPlrE();
    const setClientState = useSetClientState();

    const animatable = useComponent(localPlrE, Animatable);

    const [blackScreenTransparency, setBlackScreenTransparency] = useBinding(1);

    useEffect(() => {
        if (!enabled) return;
        setBlackScreenTransparency(0);
        spawningSound.Play();
    }, [enabled]);

    useEffect(() => {
        if (enabled && animatable !== undefined) {
            startAnimation(animatable.animator, "wakingUpFromTrauma", "Action", 0, false);
        }
    }, [enabled, animatable]);

    useTimeout(
        () => {
            setBlackScreenTransparency(1);
            if (animatable !== undefined) {
                startAnimation(animatable.animator, "wakingUpFromTrauma", "Action", 1, false);
            }
        },
        enabled ? 9 : math.huge,
    );

    useTimeout(
        () => {
            setClientState("game");
        },
        enabled ? 20 : math.huge,
    );

    return (
        <EntireScreen handleInset={true} superPositionEnability={enability} Key={"Spawning"}>
            <frame
                Size={new UDim2(5, 0, 5, 0)}
                Position={new UDim2(0.5, 0, 0.5, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                Transparency={blackScreenTransparency}
            />
        </EntireScreen>
    );
}

export default function SpawningHandler(props: { enabled: boolean }) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App />
        </EnabilityProvider>
    );
}
