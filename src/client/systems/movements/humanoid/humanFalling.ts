import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Plr } from "shared/components";
import { DirectionalMovement, Falling } from "shared/components/movements";
import { forMovement, preloadAnimation, resumeAnimation } from "shared/effects/animations";

const fallingAnimId = withAssetPrefix("14215257367");

function humanFallingAnim(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimation(animatableRecord.new.animator, fallingAnimId);
    }

    for (const [_e, plr, _falling, animatable] of w
        .query(Plr, Falling, Animatable)
        .without(DirectionalMovement)) {
        if (plr.player !== Players.LocalPlayer) break;

        resumeAnimation(animatable.animator, fallingAnimId, forMovement, 1, true);
    }
}

export = humanFallingAnim;
