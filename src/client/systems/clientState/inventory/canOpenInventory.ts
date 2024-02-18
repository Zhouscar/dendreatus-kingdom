import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Damage } from "shared/components/health";
import { isLocalPlr } from "shared/hooks/components";
import { State } from "shared/state";

function canOpenInventory(w: World, s: State) {
    if (!s.canOpenInventory && s.clientState === "inventory") {
        s.clientState = "game";
    }

    if (s.clientState !== "game" && s.clientState !== "inventory") {
        s.canOpenInventory = false;
        return;
    }

    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;

        if (!isLocalPlr(w, e)) continue;

        s.canOpenInventory = false;
        return;
    }

    for (const [e] of w.query(LocalPlr).without(/* for things like dashing, swinging*/)) {
        s.canOpenInventory = true;
        return;
    }

    s.canOpenInventory = false;
    return;
}

export = canOpenInventory;
