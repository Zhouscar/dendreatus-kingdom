import { World, useThrottle } from "@rbxts/matter";
import { Plr } from "shared/components";
import { InWater } from "shared/components/movements";
import { HARVESTABLE_CONTEXTS } from "shared/features/harvestables/constants";

function plrResetsInWater(w: World) {
    for (const [e, inWaterRecord] of w.queryChanged(InWater)) {
        if (!w.contains(e)) continue;
        if (inWaterRecord.new === undefined) continue;

        const plr = w.get(e, Plr);
        if (plr === undefined) continue;
        if (!useThrottle(0.2, e)) continue;
        task.spawn(() => {
            plr.player.Character?.Destroy();
        });
    }
}

export = plrResetsInWater;
