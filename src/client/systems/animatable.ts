import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Animatable, Human, Plr } from "shared/components";

function animatable(w: World) {
    for (const [e, plr, human] of w.query(Plr, Human).without(Animatable)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const animator = human.humanoid.FindFirstChildWhichIsA("Animator");
        if (!animator) break;
        w.insert(e, Animatable({ animator: animator }));
        break;
    }
}

export = animatable;
