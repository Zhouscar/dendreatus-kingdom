import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { BaseLandingContext } from "shared/components/movements";

function baseLandingContext(w: World) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;
        w.insert(
            e,
            BaseLandingContext({ landDuration: 1, crashLandDuration: 5, timeTilCrashLand: 1 }),
        );
    }
}

export = baseLandingContext;
