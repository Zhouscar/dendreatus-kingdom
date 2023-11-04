import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Plr } from "shared/components";
import { Dead } from "shared/components/health";
import {
    CanDash,
    CrashLanding,
    Dashing,
    OnLand,
    UsableDashContext,
} from "shared/components/movements";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";

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
            break;
        }

        if (
            os.clock() - lastDashTime >= usableDashContext.cooldown &&
            hasComponents(w, e, OnLand) &&
            !hasOneOfComponents(w, e, CrashLanding, Dead)
        ) {
            w.insert(e, CanDash({}));
            break;
        }

        w.remove(e, CanDash, Dashing);
        break;
    }
}

export = canDash;
