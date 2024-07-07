import { World } from "@rbxts/matter";
import { Players, RunService } from "@rbxts/services";
import { store } from "client/store";
import { LocalPlr, Plr } from "shared/components";
import { hasComponents } from "shared/hooks/components";
import { State } from "shared/state";
import { isStudioSettingOn } from "shared/studioSettings";

function localPlr(w: World, s: State) {
    for (const [e, localPlrRecord] of w.queryChanged(LocalPlr)) {
        if (!w.contains(e)) continue;

        if (localPlrRecord.new !== undefined) {
            if (isStudioSettingOn("immediateSpawn")) {
                s.clientState = "game";
                continue;
            }
            s.clientState = "spawning";
        }
    }

    for (const [e, plrRecord] of w.queryChanged(Plr)) {
        if (!w.contains(e)) continue;

        if (!plrRecord.new && hasComponents(w, e, LocalPlr)) {
            store.setLocalPlrE(undefined);
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
