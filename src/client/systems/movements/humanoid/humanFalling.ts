import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Animatable, LocalPlr, Plr } from "shared/components";
import { DirectionalMovement, Falling } from "shared/components/movements";
import { preloadAnimation, resumeAnimation } from "shared/effects/animations";
import { isLocalPlr } from "shared/hooks/components";

function humanFallingAnim(w: World) {
    for (const [_e, localPlr, _falling, animatable] of w
        .query(LocalPlr, Falling, Animatable)
        .without(DirectionalMovement)) {
        resumeAnimation(animatable.animator, "falling", "Movement", 1, true);
    }
}

export = humanFallingAnim;
