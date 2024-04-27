import { World } from "@rbxts/matter";
import { Renderable, Sound } from "shared/components";
import { Dead } from "shared/components/health";
import { isLocalPlr } from "shared/hooks/components";

function deathScream(w: World) {
    for (const [e, deadRecord] of w.queryChanged(Dead)) {
        if (!w.contains(e)) continue;

        if (!isLocalPlr(w, e)) continue;

        const cf = w.get(e, Renderable)?.model.GetPivot();
        if (!cf) break;

        w.spawn(
            Sound({
                audibility: 0,
                context: {
                    soundName: "deathScream",
                    volume: 1,
                    speed: 1,
                },
                cf: cf,
            }),
        );

        break;
    }
}

export = deathScream;
