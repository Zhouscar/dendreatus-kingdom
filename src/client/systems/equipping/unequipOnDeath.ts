import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Dead } from "shared/components/health";
import { Equipping, PredictUnequip } from "shared/components/items";
import { isLocalPlr } from "shared/hooks/components";

function unequipOnDeath(w: World) {
    for (const [e, dead] of w.queryChanged(Dead)) {
        if (!isLocalPlr(w, e)) continue;

        w.remove(e, Equipping);
        w.insert(e, PredictUnequip({}));
    }
}

export = unequipOnDeath;
