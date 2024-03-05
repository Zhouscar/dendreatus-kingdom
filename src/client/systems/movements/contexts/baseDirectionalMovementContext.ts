import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Stomach } from "shared/components/hunger";
import { BaseDirectionalMovementContext } from "shared/components/movements";

function baseDirectionalMovementContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        const stomach = w.get(e, Stomach);
        if (stomach && stomach.hunger <= 0) {
            w.insert(
                e,
                BaseDirectionalMovementContext({
                    walk: 5,
                    sprint: 10,
                    sneak: 3,
                    dive: 15,
                    swim: 5,
                    climb: 5,
                }),
            );
            continue;
        }

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
