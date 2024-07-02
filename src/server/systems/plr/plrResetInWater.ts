import { World, useThrottle } from "@rbxts/matter";
import { Plr } from "shared/components";
import { InWater } from "shared/components/movements";

function plrResetsInWater(w: World) {
    for (const [e, inWaterRecord] of w.queryChanged(InWater)) {
        if (!w.contains(e)) continue;
        if (inWaterRecord.new === undefined) continue;

        const plr = w.get(e, Plr);
        if (plr === undefined) continue;
        if (!useThrottle(0.2, e)) continue;
        task.spawn(() => {
            plr.player.LoadCharacter();
        });
    }
}

export = plrResetsInWater;
