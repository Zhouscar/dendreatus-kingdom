import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Damage } from "shared/components/health";

export = function (w: World) {
    for (const [e, damage] of w.queryChanged(Damage)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        print(damage.new?.amount);
    }
};
