import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { findPlrE } from "shared/calculations/findEntity";
import { Renderable, TitleCamPart } from "shared/components";
import { State } from "shared/state";

function replicationFocus(w: World, s: State) {
    Players.GetPlayers().forEach((player) => {
        const e = findPlrE(w, player);
        if (e === undefined) {
            for (const [e, titleCamPart, renderable] of w.query(TitleCamPart, Renderable)) {
                if (renderable.pv === undefined) continue;
                const part = renderable.pv?.IsA("BasePart")
                    ? renderable.pv
                    : renderable.pv?.IsA("Model")
                      ? renderable.pv.PrimaryPart !== undefined
                          ? renderable.pv.PrimaryPart
                          : renderable.pv.FindFirstChildWhichIsA("BasePart")
                      : undefined;
                if (part === undefined) continue;
                if (player.ReplicationFocus === part) continue;
                player.ReplicationFocus = part;
                break;
            }
        } else {
            player.ReplicationFocus = player.Character?.PrimaryPart;
        }
    });
}

export = replicationFocus;
