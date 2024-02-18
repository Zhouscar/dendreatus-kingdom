import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { LocalPlr, Plr } from "shared/components";
import { Acting } from "shared/components/actions";
import { Dead } from "shared/components/health";
import {
    CanDash,
    CrashLanding,
    Dashing,
    OnLand,
    UsableDashContext,
} from "shared/components/movements";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { State } from "shared/state";

let lastDashTime = 0;

function canDash(w: World, s: State) {
    if (s.clientState !== "game") {
        for (const [e, localPlr, canDash] of w.query(LocalPlr, CanDash)) {
            w.remove(e, CanDash);
        }
        return;
    }

    for (const [e, localPlr, dashing] of w.query(LocalPlr, Dashing)) {
        lastDashTime = dashing.startTime;
    }

    for (const [e, localPlr, usableDashContext] of w.query(LocalPlr, UsableDashContext)) {
        if (hasOneOfComponents(w, e, Dashing, Acting)) {
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
