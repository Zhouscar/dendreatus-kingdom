import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { BaseJumpContext, CanJump, WillJump } from "shared/components/movements";

import { isKeyDown } from "shared/hooks/keyInput";

function jump(w: World) {
    for (const [e, localPlr, _usableJumpContext, _canJump] of w
        .query(LocalPlr, BaseJumpContext, CanJump)
        .without(WillJump)) {
        if (isKeyDown("jump")) {
            w.insert(e, WillJump({}));
        }
    }
}

export = jump;
