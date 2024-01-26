import { Make } from "@rbxts/altmake";
import { World, useDeltaTime } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Plr, Renderable } from "shared/components";
import { LinearVelocity } from "shared/components/movements";

const MAX_VOLUME = 5;

const windSoundId = withAssetPrefix("687874741");

function movingWithWindSound(w: World) {
    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        if (plr.player !== Players.LocalPlayer) break;

        const soundPart = renderable.model.PrimaryPart;
        if (!soundPart) break;

        const sound =
            (soundPart.FindFirstChild("WindSound") as Sound | undefined) ||
            Make("Sound", {
                Name: "WindSound",
                SoundId: windSoundId,
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
