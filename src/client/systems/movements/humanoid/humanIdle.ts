import { World } from "@rbxts/matter";
import { Animatable, LocalPlr, Plr } from "shared/components";
import {
    Climbing,
    CrashLanding,
    Dashing,
    DirectionalMovement,
    Landing,
    OnLand,
    Sitting,
    Sneaking,
} from "shared/components/movements";
import { resumeAnimation } from "shared/effects/animations";
import { hasComponents, isLocalPlr } from "shared/hooks/components";
import { Dead } from "shared/components/health";
import { AnimName } from "shared/features/ids/animations";

function humanIdleAnim(w: World) {
    for (const [e, localPlr, animatable, _onLand] of w
        .query(LocalPlr, Animatable, OnLand)
        .without(DirectionalMovement, Dashing, CrashLanding, Landing, Dead)) {
        if (hasComponents(w, e, Climbing)) {
            resumeAnimation(animatable.animator, "climb", "Movement", 0, true);
            continue;
        }
        if (hasComponents(w, e, Sitting)) {
            resumeAnimation(animatable.animator, "sitting", "Movement", 0, true);
            continue;
        }

        const animName: AnimName = hasComponents(w, e, Sneaking) ? "sneakIdle" : "idle";

        resumeAnimation(animatable.animator, animName, "Movement", 1, true);
    }
}

export = humanIdleAnim;
