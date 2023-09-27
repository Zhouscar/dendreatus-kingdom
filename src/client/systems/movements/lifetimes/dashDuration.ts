import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Dashing, UsableDashContext } from "shared/components/movements";

function dashDuration(w: World) {
    for (const [e, plr, dashing, usableDashContext] of w.query(Plr, Dashing, UsableDashContext)) {
        if (plr.player !== Players.LocalPlayer) continue;

        if (os.clock() - dashing.startTime >= usableDashContext.duration) {
            w.remove(e, Dashing);
            break;
        }

        break;
    }
}

export = dashDuration;
