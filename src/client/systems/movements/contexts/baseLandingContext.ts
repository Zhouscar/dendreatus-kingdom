import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { BaseLandingContext } from "shared/components/movements";

function baseLandingContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        w.insert(
            e,
            BaseLandingContext({ landDuration: 1, crashLandDuration: 5, timeTilCrashLand: 1 }),
        );
    }
}

export = baseLandingContext;
