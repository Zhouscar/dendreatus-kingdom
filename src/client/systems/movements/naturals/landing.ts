import { World, useDeltaTime, useThrottle } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { CrashLanding, Landing, UsableLandingContext } from "shared/components/movements";

let queried = false;
let elapsed = 0;

function landing(w: World) {
    for (const [e, plr, usableLandingContext] of w.query(Plr, UsableLandingContext)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const landing = w.get(e, Landing);
        const crashLanding = w.get(e, CrashLanding);

        if ((landing !== undefined || crashLanding !== undefined) && !queried) {
            queried = true;
            elapsed = 0;
        }

        if (queried) {
            elapsed += useDeltaTime();
        }

        if (landing !== undefined && queried && elapsed >= usableLandingContext.landDuration) {
            w.remove(e, Landing);
            queried = false;
            return;
        }

        if (
            crashLanding !== undefined &&
            queried &&
            elapsed >= usableLandingContext.crashLandDuration
        ) {
            w.remove(e, CrashLanding);
            queried = false;
            return;
        }
        return;
    }
}

export = landing;
