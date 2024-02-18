import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { BaseDirectionalMovementContext } from "shared/components/movements";

function baseDirectionalMovementContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        w.insert(
            e,
            BaseDirectionalMovementContext({
                walk: 10,
                sprint: 30,
                sneak: 5,
                dive: 20,
                swim: 10,
                climb: 10,
            }),
        );
        break;
    }
}

export = baseDirectionalMovementContext;
