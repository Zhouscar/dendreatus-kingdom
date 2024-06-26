import Roact from "@rbxts/roact";
import { EnabilityProvider } from "../../contexts/enability";
import EntireScreen from "../../components/entireScreen";
import { useEnability, useEnabled } from "../../hooks/enability";
import { useTimeout } from "@rbxts/pretty-roact-hooks";
import { useBinding, useEffect, useRef } from "@rbxts/roact-hooked";
import useComponent from "../../hooks/useComponent";
import { Animatable } from "shared/components";
import { startAnimation } from "shared/effects/animations";
import { playSound } from "shared/effects/sounds";
import SpawningCameraHandler from "./camera";
import { useClientState } from "client/apps/hooks/ecsSelectors";
import { useLocalPlrE } from "client/apps/hooks/wContext";

function App(props: {}) {
    const enabled = useEnabled();
    const enability = useEnability();

    const localPlrE = useLocalPlrE();
    const [clientState, setClientState] = useClientState();

    const animatable = useComponent(localPlrE, Animatable);

    const [blackScreenTransparency, setBlackScreenTransparency] = useBinding(1);

    useEffect(() => {
        if (!enabled) return;
        setBlackScreenTransparency(0);
        playSound({ soundName: "wakeUpFromTrauma", volume: 1, speed: 1 });
    }, [enabled]);

    useEffect(() => {
        if (enabled && animatable !== undefined) {
            startAnimation(animatable.animator, "wakingUpFromTrauma", "Action", 0);
        }
    }, [enabled, animatable]);

    useTimeout(
        () => {
            setBlackScreenTransparency(1);
            if (animatable !== undefined) {
                startAnimation(animatable.animator, "wakingUpFromTrauma", "Action", 1);
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

export default function SpawningHandler(props: {}) {
    const [clientState, setClientState] = useClientState();

    return (
        <EnabilityProvider value={{ enabled: clientState === "spawning" }}>
            <App />
            <SpawningCameraHandler />
        </EnabilityProvider>
    );
}
