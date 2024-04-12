import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { store } from "client/store";
import { LocalPlr, Plr } from "shared/components";

function localPlr(w: World) {
    for (const [e, plrRecord] of w.queryChanged(Plr)) {
        if (!w.contains(e)) continue;

        if (!plrRecord.new) {
            w.remove(e, LocalPlr);
        }
    }

    for (const [e, plr] of w.query(Plr).without(LocalPlr)) {
        if (plr.player !== Players.LocalPlayer) continue;

        w.insert(e, LocalPlr({}));
        store.setLocalPlrE(e);
    }
}

export = localPlr;
