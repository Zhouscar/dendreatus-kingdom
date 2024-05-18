import { World } from "@rbxts/matter";
import { LocalPlr } from "shared/components";
import { Acting } from "shared/components/actions";
import { isWithDuration } from "shared/features/types";

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
