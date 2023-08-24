import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { BaseDirectionalMovementContext } from "shared/components/movements";

function baseDirectionalMovementContext(w: World) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;
        w.insert(
            e,
            BaseDirectionalMovementContext({ walk: 10, sprint: 30, sneak: 5, dive: 20, swim: 10 }),
        );
        return;
    }
}

export = baseDirectionalMovementContext;
