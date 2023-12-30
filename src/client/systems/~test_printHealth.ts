import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Health } from "shared/components/health";

export = function (w: World) {
    for (const [e, health] of w.queryChanged(Health)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
    }
};
