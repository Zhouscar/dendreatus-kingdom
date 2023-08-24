import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr, Renderable } from "shared/components";
import { Dashing, UsableDashContext } from "shared/components/movements";
import { FORWARD } from "shared/constants/direction";
import { hasComponents } from "shared/hooks/components";
import { getLinearVelocity } from "shared/hooks/memoForces";

function getDashVelocity(part: BasePart) {
    const dashVelocity = getLinearVelocity(part, "Dash");
    dashVelocity.MaxForce = math.huge;
    dashVelocity.RelativeTo = Enum.ActuatorRelativeTo.Attachment0;
    dashVelocity.VelocityConstraintMode = Enum.VelocityConstraintMode.Vector;
    return dashVelocity;
}

function humanDash(w: World) {
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
    }
}

export = humanDash;
