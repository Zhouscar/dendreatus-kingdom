import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Animatable, Human, LocalPlr, Plr } from "shared/components";

function animatable(w: World) {
    for (const [e, localPlr, human] of w.query(LocalPlr, Human).without(Animatable)) {
        const animator = human.humanoid.FindFirstChildWhichIsA("Animator");
        if (!animator) break;
        w.insert(e, Animatable({ animator: animator }));
        break;
    }
}

export = animatable;
