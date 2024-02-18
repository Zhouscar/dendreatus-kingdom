import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Damage } from "shared/components/health";
import { hasComponents } from "shared/hooks/components";

export = function (w: World) {
    for (const [e, damage] of w.queryChanged(Damage)) {
        if (!hasComponents(w, e)) continue;
    }
};
