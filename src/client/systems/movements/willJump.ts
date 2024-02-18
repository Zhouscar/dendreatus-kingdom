import { World, useDeltaTime } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { CanJump, Jumping, UsableJumpContext, WillJump } from "shared/components/movements";
import { hasComponents } from "shared/hooks/components";

let delayDuration = 0;
let queried = false;

function willJump(w: World) {
    for (const [e, localPlr, usableJumpContext, _willJump] of w.query(
        LocalPlr,
        UsableJumpContext,
        WillJump,
    )) {
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
