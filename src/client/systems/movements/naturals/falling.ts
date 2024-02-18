import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Dead } from "shared/components/health";
import {
    CrashLanding,
    Falling,
    InAir,
    Landing,
    LinearVelocity,
    OnLand,
    UsableLandingContext,
} from "shared/components/movements";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";

function fallingAndLanding(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        if (hasOneOfComponents(w, e, Dead)) continue;

        const linearVelocity = w.get(e, LinearVelocity);

        if (linearVelocity && hasComponents(w, e, InAir) && linearVelocity.velocity.Y < -20) {
            w.remove(e, Landing, CrashLanding);
            if (!hasComponents(w, e, Falling)) {
                w.insert(e, Falling({ startTime: os.clock() }));
            }
        } else {
            const falling = w.get(e, Falling);
            const usableLandingContext = w.get(e, UsableLandingContext);
            if (hasComponents(w, e, OnLand) && falling) {
                if (
                    usableLandingContext &&
                    os.clock() - falling.startTime >= usableLandingContext.timeTilCrashLand
                ) {
                    w.insert(e, CrashLanding({ startTime: os.clock() }));
                } else {
                    w.insert(e, Landing({}));
                }
            }

            w.remove(e, Falling);
        }
        break;
    }
}

export = fallingAndLanding;
