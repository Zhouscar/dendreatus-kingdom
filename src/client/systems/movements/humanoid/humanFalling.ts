import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, LocalPlr, Plr } from "shared/components";
import { DirectionalMovement, Falling } from "shared/components/movements";
import { forMovement, preloadAnimation, resumeAnimation } from "shared/effects/animations";
import { isLocalPlr } from "shared/hooks/components";

const fallingAnimId = withAssetPrefix("14215257367");

function humanFallingAnim(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        if (!isLocalPlr(w, e)) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimation(animatableRecord.new.animator, fallingAnimId);
    }

    for (const [_e, localPlr, _falling, animatable] of w
        .query(LocalPlr, Falling, Animatable)
        .without(DirectionalMovement)) {
        resumeAnimation(animatable.animator, fallingAnimId, forMovement, 1, true);
    }
}

export = humanFallingAnim;
