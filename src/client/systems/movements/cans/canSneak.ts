import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { CanSneak, OnLand, Sneaking } from "shared/components/movements";
import { hasComponents } from "shared/hooks/components";

function canSneak(w: World) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (hasComponents(w, e, OnLand)) {
            w.insert(e, CanSneak({}));
        } else {
            w.remove(e, CanSneak, Sneaking);
        }

        break;
    }
}

export = canSneak;
