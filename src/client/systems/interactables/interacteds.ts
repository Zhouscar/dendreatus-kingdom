import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Animatable } from "shared/components";
import {
    CannotInteractReason,
    Interacted,
    LocalCannotInteract,
} from "shared/components/interactables";
import { startAnimation } from "shared/effects/animations";

let startTime = 0;

const INTERACT_DURATION = 0.5;

function interacting(w: World) {
    for (const [e, interactedRecord] of w.queryChanged(Interacted)) {
        if (!w.contains(e)) continue;

        const interacted = interactedRecord.new;
        if (interacted === undefined) continue;
        if (interacted.player !== Players.LocalPlayer) continue;

        startTime = os.clock();

        w.insert(
            e,
            LocalCannotInteract({
                reason: CannotInteractReason.cooldown({
                    startTime: startTime,
                    duration: INTERACT_DURATION,
                }),
            }),
        );

        if (interacted.interactType === "harvest") {
            const animatable = w.get(e, Animatable);
            if (animatable !== undefined) {
                startAnimation(animatable.animator, "harvest", "Action");
            }
        } else if (interacted.interactType === "pickup") {
            // TODO animation?
        }
    }
}

export = interacting;
