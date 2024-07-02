import { World } from "@rbxts/matter";
import { Dead } from "shared/components/health";
import { Equipping } from "shared/components/items";
import { isLocalPlr } from "shared/hooks/components";

function unequipOnDeath(w: World) {
    for (const [e, dead] of w.queryChanged(Dead)) {
        if (!w.contains(e)) continue;
        if (!isLocalPlr(w, e)) continue;

        w.remove(e, Equipping);
    }
}

export = unequipOnDeath;
