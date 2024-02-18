import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, LocalPlr, Plr } from "shared/components";
import { Dead } from "shared/components/health";
import { forInevitability, preloadAnimation, resumeAnimation } from "shared/effects/animations";
import { isLocalPlr } from "shared/hooks/components";

const deathAnimId = withAssetPrefix("14414130377");

function deathAnimation(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        if (!w.contains(e)) continue;
        if (!isLocalPlr(w, e)) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimation(animatableRecord.new.animator, deathAnimId);
    }

    for (const [e, localPlr, dead, animatable] of w.query(LocalPlr, Dead, Animatable)) {
        const speed = os.clock() - dead.startTime < 2 ? 0.3 : 0;

        resumeAnimation(animatable.animator, deathAnimId, forInevitability, speed, false);

        break;
    }
}

export = deathAnimation;
