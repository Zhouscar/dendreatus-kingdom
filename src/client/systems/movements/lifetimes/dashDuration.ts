import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { DashContext, Dashing } from "shared/components/movements";
import gameTime from "shared/hooks/gameTime";

function dashDuration(w: World) {
    for (const [e, localPlr, dashing, usableDashContext] of w.query(
        LocalPlr,
        Dashing,
        DashContext,
    )) {
        if (gameTime() - dashing.startTime >= usableDashContext.duration) {
            w.remove(e, Dashing);
            break;
        }

        break;
    }
}

export = dashDuration;
