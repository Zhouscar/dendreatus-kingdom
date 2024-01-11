import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Animatable, Plr } from "shared/components";
import {
    Climbing,
    CrashLanding,
    Dashing,
    DirectionalMovement,
    Landing,
    OnLand,
    Sneaking,
} from "shared/components/movements";
import { forMovement, preloadAnimations, resumeAnimation } from "shared/effects/animations";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { hasComponents } from "shared/hooks/components";
import { Dead } from "shared/components/health";

const idleAnimId = withAssetPrefix("14207151528");
const sneakIdleAnimId = withAssetPrefix("14215260617");
const climbAnimId = withAssetPrefix("14207203133"); // shared

function humanIdleAnim(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimations(animatableRecord.new.animator, idleAnimId, sneakIdleAnimId);
    }

    for (const [e, plr, animatable, _onLand] of w
        .query(Plr, Animatable, OnLand)
        .without(DirectionalMovement, Dashing, CrashLanding, Landing, Dead)) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (hasComponents(w, e, Climbing)) {
            resumeAnimation(animatable.animator, climbAnimId, forMovement, 0, true);
            continue;
        }

        const animId = hasComponents(w, e, Sneaking) ? sneakIdleAnimId : idleAnimId;

        resumeAnimation(animatable.animator, animId, forMovement, 1, true);
    }
}

export = humanIdleAnim;
