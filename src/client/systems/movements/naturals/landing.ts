import { World, useDeltaTime, useThrottle } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Animatable, LocalPlr, Plr, Renderable, Sound, Transform } from "shared/components";
import {
    CrashLanding,
    Dashing,
    Falling,
    InWater,
    Landing,
    LandingContext,
} from "shared/components/movements";
import { resumeAnimation } from "shared/effects/animations";
import { hasOneOfComponents, isLocalPlr } from "shared/hooks/components";

let queried = false;
let elapsed = 0;

function landing(w: World) {
    for (const [e, landingRecord] of w.queryChanged(Landing)) {
        if (!w.contains(e)) continue;
        if (landingRecord.old !== undefined) continue;

        if (!isLocalPlr(w, e)) continue;

        const cf = w.get(e, Transform)?.cf;
        if (!cf) break;

        w.spawn(
            Sound({
                audibility: 1,
                context: {
                    volume: 1,
                    soundName: "land",
                    speed: 1,
                },
                cf: cf,
            }),
        );

        const animatable = w.get(e, Animatable);
        if (animatable) {
            resumeAnimation(animatable.animator, "landing", "Movement");
        }
    }

    for (const [e, crashLandingRecord] of w.queryChanged(CrashLanding)) {
        if (!w.contains(e)) continue;
        if (crashLandingRecord.old !== undefined) continue;

        if (!isLocalPlr(w, e)) continue;

        w.remove(e, Dashing);

        const cf = w.get(e, Transform)?.cf;
        if (!cf) break;

        w.spawn(
            Sound({
                audibility: 1,
                context: {
                    volume: 1,
                    soundName: "crashLanding",
                    speed: 1,
                },
                cf: cf,
            }),
        );

        const animatable = w.get(e, Animatable);
        if (animatable) {
            resumeAnimation(animatable.animator, "crashLanding", "Movement", true, 1, false);
        }
    }

    for (const [e, localPlr, landingContext] of w.query(LocalPlr, LandingContext)) {
        const landing = w.get(e, Landing);
        const crashLanding = w.get(e, CrashLanding);

        if (hasOneOfComponents(w, e, Falling, InWater)) {
            queried = false;
            break;
        }

        if ((landing !== undefined || crashLanding !== undefined) && !queried) {
            queried = true;
            elapsed = 0;
            break;
        }

        if (queried) {
            elapsed += useDeltaTime();
        }

        if (landing !== undefined && queried && elapsed >= landingContext.landDuration) {
            w.remove(e, Landing);
            queried = false;
            break;
        }

        if (crashLanding !== undefined && queried && elapsed >= landingContext.crashLandDuration) {
            w.remove(e, CrashLanding);
            queried = false;
            break;
        }
        break;
    }
}

export = landing;
