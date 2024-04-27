import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Animatable, LocalPlr, Plr, Renderable, Sound } from "shared/components";
import { DashContext, Dashing } from "shared/components/movements";
import { FORWARD } from "shared/constants/direction";
import { resumeAnimation } from "shared/effects/animations";
import { ANIM_IDS } from "shared/features/ids/animations";
import { SOUND_IDS } from "shared/features/ids/sounds";
import { hasComponents, isLocalPlr } from "shared/hooks/components";
import { getCustomLinearVelocity } from "shared/hooks/memoForces";

function getDashVelocity(part: BasePart) {
    const dashVelocity = getCustomLinearVelocity(part, "Dash");
    return dashVelocity;
}

function humanDash(w: World) {
    for (const [e, dashingRecord] of w.queryChanged(Dashing)) {
        if (dashingRecord.old !== undefined) continue;

        if (!isLocalPlr(w, e)) continue;

        const cf = w.get(e, Renderable)?.model.PrimaryPart?.CFrame;
        if (!cf) break;

        w.spawn(
            Sound({
                audibility: 1,
                context: {
                    volume: 1,
                    soundName: "dash",
                    speed: 1,
                },
                cf: cf,
            }),
        );

        break;
    }

    for (const [e, localPlr, renderable, dashContext] of w.query(
        LocalPlr,
        Renderable,
        DashContext,
    )) {
        if (!renderable.model.PrimaryPart) continue;

        const dashVelocity = getDashVelocity(renderable.model.PrimaryPart);
        dashVelocity.VectorVelocity = FORWARD.mul(dashContext.power);

        const isDashing = hasComponents(w, e, Dashing);
        if (useChange([isDashing])) {
            dashVelocity.Enabled = isDashing;
        }

        if (!hasComponents(w, e, Dashing)) break;

        const animatable = w.get(e, Animatable);
        if (!animatable) break;

        resumeAnimation(animatable.animator, "dash", "Movement", 1, true);

        break;
    }
}

export = humanDash;
