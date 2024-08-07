import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Dead } from "shared/components/health";
import {
    CrashLanding,
    Falling,
    InAir,
    Landing,
    LandingContext,
    LinearVelocity,
    OnLand,
} from "shared/components/movements";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import gameTime from "shared/hooks/gameTime";

function fallingAndLanding(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        if (hasOneOfComponents(w, e, Dead)) continue;

        const linearVelocity = w.get(e, LinearVelocity);

        if (linearVelocity && hasComponents(w, e, InAir) && linearVelocity.velocity.Y < -20) {
            w.remove(e, Landing, CrashLanding);
            if (!hasComponents(w, e, Falling)) {
                w.insert(e, Falling({ startTime: gameTime() }));
            }
        } else {
            const falling = w.get(e, Falling);
            const landingContext = w.get(e, LandingContext);
            if (hasComponents(w, e, OnLand) && falling) {
                if (
                    landingContext &&
                    gameTime() - falling.startTime >= landingContext.timeTilCrashLand
                ) {
                    w.insert(e, CrashLanding({ startTime: gameTime() }));
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
