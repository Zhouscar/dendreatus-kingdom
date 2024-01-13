import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Dead } from "shared/components/health";
import { Equipping, PredictUnequip } from "shared/components/items";

function unequipOnDeath(w: World) {
    for (const [e, dead] of w.queryChanged(Dead)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        w.remove(e, Equipping);
        w.insert(e, PredictUnequip({}));
    }
}

export = unequipOnDeath;
