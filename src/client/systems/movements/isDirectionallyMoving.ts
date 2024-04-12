import { World } from "@rbxts/matter";
import { DirectionalMovement, IsDirectionallyMoving } from "shared/components/movements";

function isDirectionallyMoving(w: World) {
    for (const [e, directionalMovementRecord] of w.queryChanged(DirectionalMovement)) {
        if (directionalMovementRecord.old === undefined) {
            w.insert(e, IsDirectionallyMoving({}));
        }

        if (directionalMovementRecord.new === undefined) {
            w.remove(e, IsDirectionallyMoving);
        }
    }
}

export = isDirectionallyMoving;
