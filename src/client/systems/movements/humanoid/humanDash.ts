import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Animatable, LocalPlr, Renderable, Sound, Transform } from "shared/components";
import { DashContext, Dashing } from "shared/components/movements";
import { FORWARD } from "shared/constants/direction";
import { resumeAnimation } from "shared/effects/animations";
import { hasComponents, isLocalPlr } from "shared/hooks/components";
import { getCustomLinearVelocity } from "shared/hooks/memoForces";
import { getPvPrimaryPart } from "shared/hooks/pvPart";

function getDashVelocity(part: BasePart) {
    const dashVelocity = getCustomLinearVelocity(part, "Dash");
    return dashVelocity;
}

function humanDash(w: World) {
    for (const [e, dashingRecord] of w.queryChanged(Dashing)) {
        if (!w.contains(e)) continue;

        if (dashingRecord.old !== undefined) continue;

        if (!isLocalPlr(w, e)) continue;

        const cf = w.get(e, Transform)?.cf;
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
        const part = getPvPrimaryPart(renderable.pv);
        if (!part) continue;

        const dashVelocity = getDashVelocity(part);
        dashVelocity.VectorVelocity = FORWARD.mul(dashContext.power);

        const isDashing = hasComponents(w, e, Dashing);
        if (useChange([isDashing])) {
            dashVelocity.Enabled = isDashing;
        }

        if (!hasComponents(w, e, Dashing)) break;

        const animatable = w.get(e, Animatable);
        if (!animatable) break;

        resumeAnimation(animatable.animator, "dash", "Movement", false, 1, true);

        break;
    }
}

export = humanDash;
