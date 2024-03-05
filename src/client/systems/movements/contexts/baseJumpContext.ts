import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Stomach } from "shared/components/hunger";
import { BaseJumpContext } from "shared/components/movements";

function baseJumpContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        const stomach = w.get(e, Stomach);
        if (stomach && stomach.hunger <= 0) {
            w.insert(e, BaseJumpContext({ power: 20, delay: 0.2 }));
            continue;
        }

        w.insert(e, BaseJumpContext({ power: 40, delay: 0.2 }));
        break;
    }
}

export = baseJumpContext;
