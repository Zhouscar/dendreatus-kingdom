import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import Sift from "@rbxts/sift";
import { LocalPlr, Plr } from "shared/components";
import { Stomach } from "shared/components/hunger";
import { LandingContext } from "shared/components/movements";
import { plrBaseLandingContext } from "shared/features/movements/constants";
import { hasComponents } from "shared/hooks/components";

function baseLandingContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        let data = Sift.Dictionary.copy(plrBaseLandingContext);

        const stomach = w.get(e, Stomach);
        if (stomach && stomach.hunger <= 0) {
            data = {
                landDuration: data.landDuration,
                crashLandDuration: data.crashLandDuration,
                timeTilCrashLand: data.timeTilCrashLand / 2,
            };
        }

        if (useChange([data], e) || !hasComponents(w, e, LandingContext)) {
            w.insert(e, LandingContext(data));
        }
    }
}

export = baseLandingContext;
