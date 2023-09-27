import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import {
    CanJump,
    CrashLanding,
    Jumping,
    OnLand,
    UsableJumpContext,
    WillJump,
} from "shared/components/movements";
import { hasComponents } from "shared/hooks/components";

function canJump(w: World) {
    for (const [e, plr, usableJumpContext] of w.query(Plr, UsableJumpContext)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const ON_LAND = hasComponents(w, e, OnLand);
        if (ON_LAND && !hasComponents(w, e, CrashLanding)) {
            w.insert(e, CanJump({}));
        } else {
            w.remove(e, CanJump, Jumping, WillJump);
        }
        break;
    }
}

export = canJump;
