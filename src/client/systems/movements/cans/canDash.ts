import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { CanDash, Dashing, OnLand, UsableDashContext } from "shared/components/movements";
import { hasComponents } from "shared/hooks/components";

let lastDashTime = 0;

function canDash(w: World) {
    for (const [e, plr, dashing] of w.query(Plr, Dashing)) {
        if (plr.player !== Players.LocalPlayer) continue;
        lastDashTime = dashing.startTime;
    }

    for (const [e, plr, usableDashContext] of w.query(Plr, UsableDashContext)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const dashing = w.get(e, Dashing);
        if (dashing !== undefined) {
            w.remove(e, CanDash);
            return;
        }

        if (
            os.clock() - lastDashTime >= usableDashContext.cooldown &&
            hasComponents(w, e, OnLand)
        ) {
            w.insert(e, CanDash({}));
            return;
        }

        w.remove(e, CanDash);
        return;
    }
}

export = canDash;
