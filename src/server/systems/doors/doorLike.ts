import { World } from "@rbxts/matter";
import { Door, DoorLike, Interactable } from "shared/components/interactables";

function doorLike(w: World) {
    for (const [e, _] of w.query(Door).without(DoorLike, Interactable)) {
        w.insert(
            e,
            DoorLike({
                state: "closed",
                openingOrClosingStartTime: -1,
                openDuration: 1.3,
                closeDuration: 1.4,
            }),
            Interactable({}),
        );
    }
}

export = doorLike;
