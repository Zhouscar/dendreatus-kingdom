import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";

function localPlr(w: World) {
    for (const [e, plrRecord] of w.queryChanged(Plr)) {
        if (!w.contains(e)) return;

        if (!plrRecord.new) {
            w.remove(e, LocalPlr);
        } else if (plrRecord.new.player === Players.LocalPlayer) {
            w.insert(e, LocalPlr({}));
        }
    }
}

export = localPlr;
