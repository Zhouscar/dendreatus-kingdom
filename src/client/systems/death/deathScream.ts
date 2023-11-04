import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Plr, Renderable, Sound } from "shared/components";
import { Dead } from "shared/components/health";

const deathScreamId = withAssetPrefix("2898498516");

function deathScream(w: World) {
    for (const [e, deadRecord] of w.queryChanged(Dead)) {
        if (!w.contains(e)) continue;

        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;

        const cf = w.get(e, Renderable)?.model.GetPivot();
        if (!cf) break;

        w.spawn(
            Sound({
                creator: Players.LocalPlayer,
                audibility: 0,
                context: {
                    soundId: deathScreamId,
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
