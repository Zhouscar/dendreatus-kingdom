import { World, useDeltaTime } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { CanJump, Jumping, UsableJumpContext, WillJump } from "shared/components/movements";
import { hasComponents } from "shared/hooks/components";

let delayDuration = 0;
let queried = false;

function willJump(w: World) {
    for (const [e, plr, usableJumpContext, _willJump] of w.query(
        Plr,
        UsableJumpContext,
        WillJump,
    )) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (!hasComponents(w, e, CanJump)) {
            w.remove(e, WillJump);
        }

        if (!queried) {
            delayDuration = 0;
            queried = true;
        }
        if (delayDuration >= usableJumpContext.delay && queried) {
            queried = false;
            w.insert(e, Jumping({}));
            return;
        }
        delayDuration += useDeltaTime();
        return;
    }
    queried = false;
}

export = willJump;
