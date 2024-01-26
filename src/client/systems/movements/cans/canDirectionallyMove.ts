import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Acting } from "shared/components/actions";
import { Dead } from "shared/components/health";
import {
    CanDash,
    CanDirectionallyMove,
    CrashLanding,
    DirectionalMovement,
    UsableDirectionalMovementContext,
} from "shared/components/movements";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { State } from "shared/state";

function canDirectionallyMove(w: World, s: State) {
    if (s.clientState !== "game") {
        for (const [e, plr, canDirectionallyMove] of w.query(Plr, CanDirectionallyMove)) {
            if (plr.player !== Players.LocalPlayer) continue;

            w.remove(e, CanDirectionallyMove);
        }
        return;
    }

    for (const [e, plr, usableDirectionalMovementContext] of w.query(
        Plr,
        UsableDirectionalMovementContext,
    )) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (!hasOneOfComponents(w, e, CrashLanding, Dead, Acting)) {
            w.insert(e, CanDirectionallyMove({}));
        } else {
            w.remove(e, CanDirectionallyMove, DirectionalMovement);
        }
    }
}

export = canDirectionallyMove;
