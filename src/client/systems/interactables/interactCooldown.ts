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

function interactCooldown(w: World) {
    for (const [e, interactedRecord] of w.queryChanged(Interacted)) {
        if (!w.contains(e)) continue;

        const interacted = interactedRecord.new;
        if (interacted === undefined) continue;
        if (interacted.player !== Players.LocalPlayer) continue;

        startTime = tick();

        w.insert(
            e,
            LocalCannotInteract({
                reason: CannotInteractReason.cooldown({
                    startTime: startTime,
                    duration: INTERACT_DURATION,
                }),
            }),
        );
    }
}

export = interactCooldown;
