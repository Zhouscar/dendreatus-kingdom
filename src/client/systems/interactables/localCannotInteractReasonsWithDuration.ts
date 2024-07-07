import { World } from "@rbxts/matter";
import { LocalCannotInteract } from "shared/components/interactables";
import { isWithDuration } from "shared/features/types";
import gameTime from "shared/hooks/gameTime";

function localCannotInteractReasonsWithDuration(w: World) {
    for (const [e, localCannotInteract] of w.query(LocalCannotInteract)) {
        if (!isWithDuration(localCannotInteract.reason)) continue;

        const endTime = localCannotInteract.reason.startTime + localCannotInteract.reason.duration;
        if (gameTime() >= endTime) {
            w.remove(e, LocalCannotInteract);
        }
    }
}

export = localCannotInteractReasonsWithDuration;
