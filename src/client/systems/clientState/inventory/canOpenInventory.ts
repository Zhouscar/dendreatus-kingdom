import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Damage } from "shared/components/health";
import { CanDirectionallyMove, OnLand } from "shared/components/movements";
import { ClientState, State } from "shared/state";

function canOpenInventory(w: World, s: State) {
    if (!s.canOpenInventory && s.clientState === "inventory") {
        s.clientState = "game";
    }

    if (s.clientState !== "game" && s.clientState !== "inventory") {
        s.canOpenInventory = false;
        return;
    }

    // for (const [e, damageRecord] of w.queryChanged(Damage)) {
    //     if (!w.contains(e)) continue;

    //     const plr = w.get(e, Plr);
    //     if (plr?.player !== Players.LocalPlayer) continue;

    //     if (s.canOpenInventory !== false) {
    //         willSnapToGame = true;
    //     }
    //     s.canOpenInventory = false;
    //     return;
    // }

    for (const [e, plr, onLand, canDirectionallyMove] of w
        .query(Plr, OnLand, CanDirectionallyMove)
        .without(/* for things like dashing, swinging*/)) {
        if (plr.player !== Players.LocalPlayer) continue;

        s.canOpenInventory = true;
        return;
    }

    s.canOpenInventory = false;
    return;
}

export = canOpenInventory;
