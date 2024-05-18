import { World } from "@rbxts/matter";
import { LocalPlr, Plr, Renderable } from "shared/components";

const defaultSoundNames = [
    "Climbing",
    "Died",
    "FreeFalling",
    "GettingUp",
    "Jumping",
    "Landing",
    "Running",
    "Splash",
    "Swimming",
];

function disableDefaultCharacterSounds(w: World) {
    for (const [e, localPlr, renderable] of w.query(LocalPlr, Renderable)) {
        if (!renderable.pv.IsA("Model")) continue;

        renderable.pv.PrimaryPart?.GetChildren()
            .filter(
                (child): child is Sound =>
                    child.IsA("Sound") && defaultSoundNames.includes(child.Name),
            )
            .forEach((sound) => {
                sound.Destroy();
            });
    }
}

export = disableDefaultCharacterSounds;
