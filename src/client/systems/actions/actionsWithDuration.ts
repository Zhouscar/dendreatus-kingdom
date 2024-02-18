import { AnyEntity, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Acting, isWithDuration } from "shared/components/actions";

function actionsWithDuration(w: World) {
    for (const [e, localPlr, acting] of w.query(LocalPlr, Acting)) {
        const action = acting.action;
        if (!isWithDuration(action)) continue;

        const endTime = action.startTime + action.duration;

        if (os.clock() >= endTime) {
            w.remove(e, Acting);
        }
    }
}

export = actionsWithDuration;
