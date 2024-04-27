import { World } from "@rbxts/matter";
import { Animatable } from "shared/components";
import { preloadAnimations } from "shared/effects/animations";
import { isLocalPlr } from "shared/hooks/components";

function animatablePreloadAnimations(w: World) {
    for (const [e, animatableRecord] of w.queryChanged(Animatable)) {
        if (!isLocalPlr(w, e)) continue;
        if (animatableRecord.new === undefined) continue;

        preloadAnimations(
            animatableRecord.new.animator,
            "climb",
            "crashLanding",
            "dash",
            "death",
            "dive",
            "falling",
            "idle",
            "jump",
            "landing",
            "sneak",
            "sneakIdle",
            "sprint",
            "swim",
            "walk",
        );
    }
}

export = animatablePreloadAnimations;
