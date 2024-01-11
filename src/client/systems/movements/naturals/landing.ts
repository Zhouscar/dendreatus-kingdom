import { World, useDeltaTime, useThrottle } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Plr, Renderable, Sound } from "shared/components";
import {
    CrashLanding,
    Dashing,
    Falling,
    InWater,
    Landing,
    UsableLandingContext,
} from "shared/components/movements";
import { forMovement, preloadAnimations, resumeAnimation } from "shared/effects/animations";
import { hasOneOfComponents } from "shared/hooks/components";

let queried = false;
let elapsed = 0;

const landingAnimId = withAssetPrefix("14207189927");
const crashLandingAnimId = withAssetPrefix("14207211480");

const landingSoundId = withAssetPrefix("268933841");
const crashLandingSoundId = withAssetPrefix("6670655395");

function landing(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimations(animatableRecord.new.animator, landingAnimId, crashLandingAnimId);
    }

    for (const [e, landingRecord] of w.queryChanged(Landing)) {
        if (!w.contains(e)) continue;
        if (landingRecord.old !== undefined) continue;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        const cf = w.get(e, Renderable)?.model.PrimaryPart?.CFrame;
        if (!cf) break;

        w.spawn(
            Sound({
                creator: Players.LocalPlayer,
                audibility: 1,
                context: {
                    volume: 1,
                    soundId: landingSoundId,
                    speed: 1,
                },
                cf: cf,
            }),
        );

        const animatable = w.get(e, Animatable);
        if (animatable) {
            resumeAnimation(animatable.animator, landingAnimId, forMovement, 1, false);
        }
    }

    for (const [e, crashLandingRecord] of w.queryChanged(CrashLanding)) {
        if (!w.contains(e)) continue;
        if (crashLandingRecord.old !== undefined) continue;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        w.remove(e, Dashing);

        const cf = w.get(e, Renderable)?.model.PrimaryPart?.CFrame;
        if (!cf) break;

        w.spawn(
            Sound({
                creator: Players.LocalPlayer,
                audibility: 1,
                context: {
                    volume: 1,
                    soundId: crashLandingSoundId,
                    speed: 1,
                },
                cf: cf,
            }),
        );

        const animatable = w.get(e, Animatable);
        if (animatable) {
            resumeAnimation(animatable.animator, crashLandingAnimId, forMovement, 1, false);
        }
    }

    for (const [e, plr, usableLandingContext] of w.query(Plr, UsableLandingContext)) {
        if (plr.player !== Players.LocalPlayer) continue;

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

        if (landing !== undefined && queried && elapsed >= usableLandingContext.landDuration) {
            w.remove(e, Landing);
            queried = false;
            break;
        }

        if (
            crashLanding !== undefined &&
            queried &&
            elapsed >= usableLandingContext.crashLandDuration
        ) {
            w.remove(e, CrashLanding);
            queried = false;
            break;
        }
        break;
    }
}

export = landing;
