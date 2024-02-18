import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Dead } from "shared/components/health";
import { State } from "shared/state";

function deathClientState(w: World, s: State) {
    for (const [e, localPlr, dead] of w.query(LocalPlr, Dead)) {
        s.clientState = "death";
    }
}

export = deathClientState;
