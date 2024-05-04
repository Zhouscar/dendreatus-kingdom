import { AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { CannotInteract, CannotInteractReason, Harvestable } from "shared/components/interactables";
import { HARVESTABLE_CONTEXTS, HARVESTABLE_COOLDOWN } from "shared/features/harvestables/constants";
import { hasComponents } from "shared/hooks/components";

function getHarvestableTagCtor(w: World, e: AnyEntity) {
    let TheCtor: ComponentCtor | undefined = undefined;
    HARVESTABLE_CONTEXTS.forEach((context, Ctor) => {
        if (TheCtor !== undefined) return;
        if (hasComponents(w, e, Ctor)) {
            TheCtor = Ctor;
        }
    });
    return TheCtor;
}

function harvestablesCooldown(w: World) {
    for (const [e, harvestableRecord] of w.queryChanged(Harvestable)) {
        if (!w.contains(e)) continue;

        const harvestable = harvestableRecord.new;
        if (harvestable === undefined) continue;

        const harvestableTagCtor = getHarvestableTagCtor(w, e);
        if (harvestableTagCtor === undefined) continue;

        const context = HARVESTABLE_CONTEXTS.get(harvestableTagCtor);
        if (context === undefined) continue;

        if (harvestable.amountLeftToHarvest <= 0) {
            w.insert(
                e,
                CannotInteract({
                    reason: CannotInteractReason.cooldown({
                        startTime: tick(),
                        duration: HARVESTABLE_COOLDOWN,
                    }),
                }),
                harvestable.patch({ amountLeftToHarvest: context.amountBeforeCooldown }),
            );
        }
    }
}

export = harvestablesCooldown;
