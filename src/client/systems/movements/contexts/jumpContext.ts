import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import Sift from "@rbxts/sift";
import { LocalPlr, Plr } from "shared/components";
import { Stomach } from "shared/components/hunger";
import { JumpContext } from "shared/components/movements";
import { plrBaseJumpContext } from "shared/features/movements/constants";
import { hasComponents } from "shared/hooks/components";

function baseJumpContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        let data = Sift.Dictionary.copy(plrBaseJumpContext);

        const stomach = w.get(e, Stomach);
        if (stomach && stomach.hunger <= 0) {
            data = {
                power: data.power / 2,
                delay: data.delay,
            };
        }

        if (useChange([data], e) || !hasComponents(w, e, JumpContext)) {
            w.insert(e, JumpContext(data));
        }
    }
}

export = baseJumpContext;
