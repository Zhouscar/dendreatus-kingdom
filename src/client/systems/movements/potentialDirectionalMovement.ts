import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import {
    Climbing,
    DirectionalMovementType,
    InAir,
    InWater,
    PotentialDirectionalMovement,
    Sneaking,
} from "shared/components/movements";
import { hasComponents } from "shared/hooks/components";
import { isKeyDown } from "shared/hooks/keyInput";

function potentialDirectionalMovement(w: World) {
    for (const [e, plr] of w.query(Plr)) {
        if (plr.player !== Players.LocalPlayer) continue;
        const potentialDirectionalMovementType: DirectionalMovementType = hasComponents(
            w,
            e,
            Climbing,
        )
            ? "climb"
            : hasComponents(w, e, InAir)
              ? "dive"
              : hasComponents(w, e, InWater)
                ? "swim"
                : isKeyDown("sprintDash")
                  ? "sprint"
                  : hasComponents(w, e, Sneaking)
                    ? "sneak"
                    : "walk";

        w.insert(e, PotentialDirectionalMovement({ type: potentialDirectionalMovementType }));
        break;
    }
}

export = potentialDirectionalMovement;
