import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import {
    CanDirectionallyMove,
    CrashLanding,
    DirectionalMovement,
    UsableDirectionalMovementContext,
} from "shared/components/movements";
import { hasComponents } from "shared/hooks/components";

function canDirectionallyMove(w: World) {
    for (const [e, plr, usableDirectionalMovementContext] of w.query(
        Plr,
        UsableDirectionalMovementContext,
    )) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (!hasComponents(w, e, CrashLanding)) {
            w.insert(e, CanDirectionallyMove({}));
        } else {
            w.remove(e, CanDirectionallyMove, DirectionalMovement);
        }
    }
}

export = canDirectionallyMove;
