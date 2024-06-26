import { useEventListener } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect } from "@rbxts/roact-hooked";
import { useEnabled } from "client/apps/hooks/enability";
import useComponent from "client/apps/hooks/useComponent";
import { useLocalPlrE, useW } from "client/apps/hooks/wContext";
import animatable from "client/systems/animatable";
import { Animatable, Human, Sound, Transform } from "shared/components";
import { startAnimation } from "shared/effects/animations";

export default function DeathInWorldHandler(props: {}) {
    const w = useW();
    const enabled = useEnabled();
    const localPlrE = useLocalPlrE();
    const transform = useComponent(localPlrE, Transform);

    const human = useComponent(localPlrE, Human);
    const animatable = useComponent(localPlrE, Animatable);

    useEventListener(human?.humanoid.StateChanged, (state) => {
        if (
            !enabled ||
            human === undefined ||
            human.humanoid.GetState() !== Enum.HumanoidStateType.Running
        )
            return;
        human.humanoid.ChangeState("Running");
    });

    useEffect(() => {
        if (!enabled) return;
        if (transform !== undefined) {
            w.spawn(
                Sound({
                    audibility: 1,
                    context: {
                        soundName: "deathScream",
                    },
                    cf: transform.cf,
                }),
            );
        }
        if (animatable !== undefined) {
            startAnimation(animatable.animator, "death", "Action");
        }
    }, [enabled]);

    return <></>;
}
