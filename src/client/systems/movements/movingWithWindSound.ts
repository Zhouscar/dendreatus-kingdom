import { Make } from "@rbxts/altmake";
import { World, useDeltaTime } from "@rbxts/matter";
import { LocalPlr, Plr, Renderable } from "shared/components";
import { LinearVelocity } from "shared/components/movements";
import { SOUND_IDS } from "shared/features/ids/sounds";

const MAX_VOLUME = 5;

function movingWithWindSound(w: World) {
    for (const [e, localPlr, renderable] of w.query(LocalPlr, Renderable)) {
        if (!renderable.pv.IsA("Model")) continue;

        const soundPart = renderable.pv.PrimaryPart;
        if (!soundPart) break;

        const sound =
            (soundPart.FindFirstChild("WindSound") as Sound | undefined) ||
            Make("Sound", {
                Name: "WindSound",
                SoundId: SOUND_IDS.wind,
                Looped: true,
                Playing: true,
                Parent: soundPart,
            });

        const linearVelocity = w.get(e, LinearVelocity);

        const movementSpeed = linearVelocity ? linearVelocity.velocity.Magnitude : 0;

        const newVolume =
            movementSpeed >= 20
                ? math.min(movementSpeed / 100, MAX_VOLUME)
                : sound.Volume - useDeltaTime();

        sound.Volume = newVolume;

        break;
    }
}

export = movingWithWindSound;
