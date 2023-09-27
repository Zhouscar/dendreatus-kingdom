import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Plr } from "shared/components";
import {
    CrashLanding,
    Falling,
    InAir,
    Landing,
    LinearVelocity,
    OnLand,
    UsableLandingContext,
} from "shared/components/movements";
import { forMovement, resumeAnimation } from "shared/effects/animations";
import { hasComponents } from "shared/hooks/components";

function fallingAndLanding(w: World) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;

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
