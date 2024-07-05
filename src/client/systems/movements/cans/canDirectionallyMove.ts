import { World } from "@rbxts/matter";
import { LocalPlr } from "shared/components";
import { Acting } from "shared/components/actions";
import { Dead } from "shared/components/health";
import {
    CanDirectionallyMove,
    CrashLanding,
    DirectionalMovement,
    DirectionalMovementContext,
    Sitting,
} from "shared/components/movements";
import { hasOneOfComponents } from "shared/hooks/components";
import { State } from "shared/state";

function canDirectionallyMove(w: World, s: State) {
    if (s.clientState !== "game") {
        for (const [e, localPlr, canDirectionallyMove] of w.query(LocalPlr, CanDirectionallyMove)) {
            w.remove(e, CanDirectionallyMove, DirectionalMovement);
        }
        return;
    }

    for (const [e, localPlr, directionalMovementContext] of w.query(
        LocalPlr,
        DirectionalMovementContext,
    )) {
        if (!hasOneOfComponents(w, e, CrashLanding, Dead, Acting, Sitting)) {
            w.insert(e, CanDirectionallyMove({}));
        } else {
            w.remove(e, CanDirectionallyMove, DirectionalMovement);
        }
    }
}

export = canDirectionallyMove;
