import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { BaseJumpContext } from "shared/components/movements";

function baseJumpContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        w.insert(e, BaseJumpContext({ power: 40, delay: 0.2 }));
        break;
    }
}

export = baseJumpContext;
