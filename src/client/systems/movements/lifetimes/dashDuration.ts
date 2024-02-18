import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Dashing, UsableDashContext } from "shared/components/movements";

function dashDuration(w: World) {
    for (const [e, localPlr, dashing, usableDashContext] of w.query(
        LocalPlr,
        Dashing,
        UsableDashContext,
    )) {
        if (os.clock() - dashing.startTime >= usableDashContext.duration) {
            w.remove(e, Dashing);
            break;
        }

        break;
    }
}

export = dashDuration;
