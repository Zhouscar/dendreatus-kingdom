import { World } from "@rbxts/matter";
import { findPlrE } from "shared/calculations/findEntity";
import { Interacted, Interacting } from "shared/components/interactables";
import { State } from "shared/state";

function interactedInteracting(w: World, s: State) {
    for (const [e, interactedRecord] of w.queryChanged(Interacted)) {
        if (interactedRecord.new !== undefined && w.contains(e)) {
            const plrE = findPlrE(w, interactedRecord.new.player);
            if (plrE === undefined) continue;

            w.insert(
                plrE,
                Interacting({
                    interactE: e,
                    interactType: interactedRecord.new.interactType,
                    interactTime: interactedRecord.new.interactTime,
                }),
            );
        }
    }
}

export = interactedInteracting;
