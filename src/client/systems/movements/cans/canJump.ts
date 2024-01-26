import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Acting } from "shared/components/actions";
import { Dead } from "shared/components/health";
import {
    CanJump,
    CrashLanding,
    Jumping,
    OnLand,
    UsableJumpContext,
    WillJump,
} from "shared/components/movements";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { State } from "shared/state";

function canJump(w: World, s: State) {
    if (s.clientState !== "game") {
        for (const [e, plr, canJump] of w.query(Plr, CanJump)) {
            if (plr.player !== Players.LocalPlayer) continue;

            w.remove(e, CanJump);
        }
        return;
    }

    for (const [e, plr, usableJumpContext] of w.query(Plr, UsableJumpContext)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const ON_LAND = hasComponents(w, e, OnLand);
        if (ON_LAND && !hasOneOfComponents(w, e, CrashLanding, Dead, Acting)) {
            w.insert(e, CanJump({}));
        } else {
            w.remove(e, CanJump, Jumping, WillJump);
        }
        break;
    }
}

export = canJump;
