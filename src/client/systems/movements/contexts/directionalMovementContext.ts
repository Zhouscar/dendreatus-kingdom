import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import Sift from "@rbxts/sift";
import { LocalPlr, Plr } from "shared/components";
import { Stomach } from "shared/components/hunger";
import { DirectionalMovementContext } from "shared/components/movements";
import { plrBaseDirectionalMovementContext } from "shared/features/movements/constants";
import { hasComponents } from "shared/hooks/components";

function baseDirectionalMovementContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        let data = Sift.Dictionary.copy(plrBaseDirectionalMovementContext);

        const stomach = w.get(e, Stomach);
        if (stomach && stomach.hunger <= 0) {
            data = {
                walk: data.walk / 2,
                sprint: data.sprint / 2,
                sneak: data.sneak / 2,
                dive: data.dive / 2,
                swim: data.swim / 2,
                climb: data.climb / 2,

                acceleration: data.acceleration / 2,
                decceleration: data.decceleration / 2,
            };
        }

        if (useChange([data], e) || !hasComponents(w, e, DirectionalMovementContext)) {
            w.insert(e, DirectionalMovementContext(data));
        }
    }
}

export = baseDirectionalMovementContext;
