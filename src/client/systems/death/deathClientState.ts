import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Dead } from "shared/components/health";
import { State } from "shared/state";

function deathClientState(w: World, s: State) {
    for (const [e, plr, dead] of w.query(Plr, Dead)) {
        if (plr.player !== Players.LocalPlayer) continue;
        s.clientState = "death";
    }
}

export = deathClientState;
