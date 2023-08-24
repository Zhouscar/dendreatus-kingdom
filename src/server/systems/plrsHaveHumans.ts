import { World } from "@rbxts/matter";
import { Human, Plr, Renderable } from "shared/components";

function plrsHaveHumans(w: World) {
    for (const [e, _plr, renderable] of w.query(Plr, Renderable).without(Human)) {
        const humanoid = renderable.model.FindFirstChildWhichIsA("Humanoid");
        if (humanoid) {
            w.insert(e, Human({ humanoid: humanoid }));
        } else {
            w.remove(e, Human);
        }
    }
}

export = plrsHaveHumans;
