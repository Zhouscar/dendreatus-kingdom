import { World } from "@rbxts/matter";
import { Harvestable, Interactable } from "shared/components/interactables";
import { HARVESTABLE_CONTEXTS } from "shared/features/harvestables/constants";

function harvestables(w: World) {
    HARVESTABLE_CONTEXTS.forEach((context, Ctor) => {
        for (const [e, _] of w.query(Ctor).without(Harvestable, Interactable)) {
            w.insert(
                e,
                Harvestable({
                    itemType: context.itemType,
                    amountLeftToHarvest: context.amountBeforeCooldown,
                }),
                Interactable({}),
            );
        }
    });
}

export = harvestables;
