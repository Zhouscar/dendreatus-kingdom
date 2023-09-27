import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { BaseJumpContext } from "shared/components/movements";

function baseJumpContext(w: World) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;
        w.insert(e, BaseJumpContext({ power: 40, delay: 0.2 }));
        break;
    }
}

export = baseJumpContext;
