import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { hasComponents } from "shared/hooks/components";
import { State } from "shared/state";

function localPlr(w: World, s: State) {
    for (const [e, localPlrRecord] of w.queryChanged(LocalPlr)) {
        if (!w.contains(e)) continue;

        if (localPlrRecord.new === undefined) continue;

        s.clientState = "spawning";
    }

    for (const [e, plrRecord] of w.queryChanged(Plr)) {
        if (!w.contains(e)) continue;

        if (!plrRecord.new && hasComponents(w, e, LocalPlr)) {
            w.remove(e, LocalPlr);
        }
    }

    for (const [e, plr] of w.query(Plr).without(LocalPlr)) {
        if (plr.player !== Players.LocalPlayer) continue;

        w.insert(e, LocalPlr({}));
    }
}

export = localPlr;
