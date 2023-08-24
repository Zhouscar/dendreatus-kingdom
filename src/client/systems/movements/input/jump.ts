import { World, useDeltaTime, useThrottle } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { BaseJumpContext, CanJump, Jumping, OnLand } from "shared/components/movements";
import { isKeyDown } from "shared/hooks/keyInput";

let delayDuration = 0;
let queried = false;

function jump(w: World) {
    for (const [e, plr, usableJumpContext, canJump] of w.query(Plr, BaseJumpContext, CanJump)) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (isKeyDown("jump") && !queried) {
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

export = jump;
