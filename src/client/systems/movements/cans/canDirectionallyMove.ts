import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Dead } from "shared/components/health";
import {
    CanDirectionallyMove,
    CrashLanding,
    DirectionalMovement,
    UsableDirectionalMovementContext,
} from "shared/components/movements";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";

function canDirectionallyMove(w: World) {
    for (const [e, plr, usableDirectionalMovementContext] of w.query(
        Plr,
        UsableDirectionalMovementContext,
    )) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (!hasOneOfComponents(w, e, CrashLanding, Dead)) {
            w.insert(e, CanDirectionallyMove({}));
        } else {
            w.remove(e, CanDirectionallyMove, DirectionalMovement);
        }
    }
}

export = canDirectionallyMove;
