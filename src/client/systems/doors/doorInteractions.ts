import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { DoorLike, Interacted } from "shared/components/interactables";

function doorInteractions(w: World) {
    for (const [e, interactedRecord] of w.queryChanged(Interacted)) {
        if (!w.contains(e)) continue;

        const interacted = interactedRecord.new;
        if (interacted === undefined) continue;
        if (interacted.player !== Players.LocalPlayer) continue;

        const doorLike = w.get(e, DoorLike);
        if (doorLike === undefined) continue;

        if (interacted.interactType === "door_open") {
            w.insert(
                e,
                doorLike.patch({
                    state: "opening",
                    openingOrClosingStartTime: interacted.interactTime,
                }),
            );
        } else if (interacted.interactType === "door_close") {
            w.insert(
                e,
                doorLike.patch({
                    state: "closing",
                    openingOrClosingStartTime: interacted.interactTime,
                }),
            );
        }
    }
}

export = doorInteractions;
