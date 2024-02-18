import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { BaseDashContext } from "shared/components/movements";

function baseDashContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        w.insert(e, BaseDashContext({ duration: 0.2, power: 100, cooldown: 1 }));
        break;
    }
}

export = baseDashContext;
