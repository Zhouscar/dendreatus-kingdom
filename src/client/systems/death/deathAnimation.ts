import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Plr } from "shared/components";
import { Dead } from "shared/components/health";
import { forInevitability, preloadAnimation, resumeAnimation } from "shared/effects/animations";

const deathAnimId = withAssetPrefix("14414130377");

function deathAnimation(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimation(animatableRecord.new.animator, deathAnimId);
    }

    for (const [e, plr, dead, animatable] of w.query(Plr, Dead, Animatable)) {
        if (plr?.player !== Players.LocalPlayer) continue;

        const speed = os.clock() - dead.startTime < 2 ? 0.3 : 0;

        resumeAnimation(animatable.animator, deathAnimId, forInevitability, speed, false);

        break;
    }
}

export = deathAnimation;
