import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Plr, Renderable, Sound } from "shared/components";
import { Dead } from "shared/components/health";
import { isLocalPlr } from "shared/hooks/components";

const deathScreamSoundId = withAssetPrefix("5825316184");

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
                    soundId: deathScreamSoundId,
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
