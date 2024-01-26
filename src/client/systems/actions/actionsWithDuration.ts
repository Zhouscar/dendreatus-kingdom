import { AnyEntity, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Acting, isWithDuration } from "shared/components/actions";

function actionsWithDuration(w: World) {
    for (const [e, plr, acting] of w.query(Plr, Acting)) {
        if (plr.player !== Players.LocalPlayer) continue;

        const action = acting.action;
        if (!isWithDuration(action)) continue;

        const endTime = action.startTime + action.duration;

        if (os.clock() >= endTime) {
            w.remove(e, Acting);
        }
    }
}

export = actionsWithDuration;
