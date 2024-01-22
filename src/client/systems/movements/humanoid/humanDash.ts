import { World } from "@rbxts/matter";
import { ControllerService, Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Plr, Renderable, Sound } from "shared/components";
import { Dashing, UsableDashContext } from "shared/components/movements";
import { FORWARD } from "shared/constants/direction";
import { forMovement, preloadAnimation, resumeAnimation } from "shared/effects/animations";
import { hasComponents } from "shared/hooks/components";
import { getLinearVelocity } from "shared/hooks/memoForces";

const dashAnimId = withAssetPrefix("14215455071");
const dashSoundId = withAssetPrefix("4909206080");

function getDashVelocity(part: BasePart) {
    const dashVelocity = getLinearVelocity(part, "Dash");
    dashVelocity.MaxForce = math.huge;
    dashVelocity.RelativeTo = Enum.ActuatorRelativeTo.Attachment0;
    dashVelocity.VelocityConstraintMode = Enum.VelocityConstraintMode.Vector;
    return dashVelocity;
}

function humanDash(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimation(animatableRecord.new.animator, dashAnimId);
    }

    for (const [e, dashingRecord] of w.queryChanged(Dashing)) {
        if (dashingRecord.old !== undefined) continue;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        const cf = w.get(e, Renderable)?.model.PrimaryPart?.CFrame;
        if (!cf) break;

        w.spawn(
            Sound({
                creator: Players.LocalPlayer,
                audibility: 1,
                context: {
                    volume: 1,
                    soundId: dashSoundId,
                    speed: 1,
                },
                cf: cf,
            }),
        );

        break;
    }

    for (const [e, plr, renderable, usableDashContext] of w.query(
        Plr,
        Renderable,
        UsableDashContext,
    )) {
        if (plr.player !== Players.LocalPlayer) continue;
        if (!renderable.model.PrimaryPart) continue;

        const dashVelocity = getDashVelocity(renderable.model.PrimaryPart);
        dashVelocity.VectorVelocity = FORWARD.mul(usableDashContext.power);
        dashVelocity.Enabled = hasComponents(w, e, Dashing);

        if (!hasComponents(w, e, Dashing)) break;

        const animatable = w.get(e, Animatable);
        if (!animatable) break;

        resumeAnimation(animatable.animator, dashAnimId, forMovement, 1, true);

        break;
    }
}

export = humanDash;
