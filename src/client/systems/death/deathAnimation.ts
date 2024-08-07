import { World } from "@rbxts/matter";
import { Animatable, LocalPlr } from "shared/components";
import { Dead } from "shared/components/health";
import { resumeAnimation } from "shared/effects/animations";
import gameTime from "shared/hooks/gameTime";

function deathAnimation(w: World) {
    for (const [e, localPlr, dead, animatable] of w.query(LocalPlr, Dead, Animatable)) {
        const speed = gameTime() - dead.startTime < 2 ? 0.3 : 0;

        resumeAnimation(animatable.animator, "death", "Action4", true, speed, false);

        break;
    }
}

export = deathAnimation;
