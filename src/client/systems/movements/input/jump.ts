import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { BaseJumpContext, CanJump, WillJump } from "shared/components/movements";

import { isKeyDown } from "shared/hooks/keyInput";

function jump(w: World) {
    for (const [e, plr, _usableJumpContext, _canJump] of w
        .query(Plr, BaseJumpContext, CanJump)
        .without(WillJump)) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (isKeyDown("jump")) {
            w.insert(e, WillJump({}));
        }
    }
}

export = jump;
