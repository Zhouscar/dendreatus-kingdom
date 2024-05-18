import { World } from "@rbxts/matter";
import { CannotInteract } from "shared/components/interactables";
import { isWithDuration } from "shared/features/types";

function cannotInteractReasonsWithDuration(w: World) {
    for (const [e, cannotInteract] of w.query(CannotInteract)) {
        if (!isWithDuration(cannotInteract.reason)) continue;

        const endTime = cannotInteract.reason.startTime + cannotInteract.reason.duration;
        if (os.clock() >= endTime) {
            w.remove(e, CannotInteract);
        }
    }
}

export = cannotInteractReasonsWithDuration;
