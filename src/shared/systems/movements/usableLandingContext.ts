import { World } from "@rbxts/matter";
import { BaseLandingContext, UsableLandingContext } from "shared/components/movements";

function usableLandingContext(w: World) {
    for (const [e, baseLandingContext] of w.query(BaseLandingContext)) {
        const landDuration = baseLandingContext.landDuration;
        const crashLandDuration = baseLandingContext.crashLandDuration;
        const timeTilCrashLand = baseLandingContext.timeTilCrashLand;

        w.insert(
            e,
            UsableLandingContext({
                landDuration: landDuration,
                crashLandDuration: crashLandDuration,
                timeTilCrashLand: timeTilCrashLand,
            }),
        );
    }
}

export = usableLandingContext;
