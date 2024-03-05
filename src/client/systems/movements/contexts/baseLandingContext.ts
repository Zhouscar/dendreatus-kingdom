import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Stomach } from "shared/components/hunger";
import { BaseLandingContext } from "shared/components/movements";

function baseLandingContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        const stomach = w.get(e, Stomach);
        if (stomach && stomach.hunger <= 0) {
            w.insert(
                e,
                BaseLandingContext({
                    landDuration: 2,
                    crashLandDuration: 5,
                    timeTilCrashLand: 0.2,
                }),
            );
            continue;
        }

        w.insert(
            e,
            BaseLandingContext({ landDuration: 1, crashLandDuration: 5, timeTilCrashLand: 1 }),
        );
    }
}

export = baseLandingContext;
