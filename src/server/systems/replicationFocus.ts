import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { findPlrE } from "shared/calculations/findEntity";
import { Renderable, TitleCamPart } from "shared/components";
import { getPvAnyPart } from "shared/hooks/pvPart";
import { State } from "shared/state";

function replicationFocus(w: World, s: State) {
    Players.GetPlayers().forEach((player) => {
        const e = findPlrE(w, player);
        if (e === undefined) {
            for (const [e, titleCamPart, renderable] of w.query(TitleCamPart, Renderable)) {
                const part = getPvAnyPart(renderable.pv);
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
