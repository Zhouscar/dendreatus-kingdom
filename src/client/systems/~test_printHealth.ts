import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Health } from "shared/components/health";
import { hasComponents, isLocalPlr } from "shared/hooks/components";

export = function (w: World) {
    for (const [e, health] of w.queryChanged(Health)) {
        if (!isLocalPlr(w, e)) continue;
    }
};
