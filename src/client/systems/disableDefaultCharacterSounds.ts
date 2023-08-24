import { World } from "@rbxts/matter";
import { Plr, Renderable } from "shared/components";

function disableDefaultCharacterSounds(w: World) {
    for (const [e, plr, renderable] of w.query(Plr, Renderable)) {
        renderable.model.PrimaryPart?.GetChildren()
            .filter((child): child is Sound => child.IsA("Sound"))
            .forEach((sound) => {
                sound.Destroy();
            });
    }
}

export = disableDefaultCharacterSounds;
