import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { BaseDashContext } from "shared/components/movements";

function baseDashContext(w: World) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;
        w.insert(e, BaseDashContext({ duration: 0.2, power: 100, cooldown: 1 }));
        return;
    }
}

export = baseDashContext;
