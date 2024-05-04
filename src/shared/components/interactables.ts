import { ItemType } from "shared/features/items/types";
import { ComponentCreator } from "./creators";
import variantModule, { fields, TypeNames, VariantOf } from "@rbxts/variant";
import { WithDuration } from "shared/features/types";
import { AnyEntity } from "@rbxts/matter";
import { InteractType } from "shared/features/interactables/types";

export const CannotInteractReason = variantModule({
    busy: fields<WithDuration>(),
    cooldown: fields<WithDuration>(),
});
export type CannotInteractReason<T extends TypeNames<typeof CannotInteractReason> = undefined> =
    VariantOf<typeof CannotInteractReason, T>;

export const Interactable = ComponentCreator.replicated<{}>("Interactable");
export type Interactable = ReturnType<typeof Interactable>;

export const Interacting = ComponentCreator.base<{
    interactE: AnyEntity;
    interactType: InteractType;
}>("Interacting"); // not sure if this will become synced
export type Interacting = ReturnType<typeof Interacting>;

export const TestInteractable = ComponentCreator.tag("TestInteractable");
export type TestInteractable = ReturnType<typeof TestInteractable>;

export const CannotInteract = ComponentCreator.replicated<{ reason: CannotInteractReason }>(
    "CannotInteract",
);
export type CannotInteract = ReturnType<typeof CannotInteract>;

export const Harvestable = ComponentCreator.replicated<{
    itemType: ItemType;
    amountLeftToHarvest: number;
}>("Harvestable");
export type Harvestable = ReturnType<typeof Harvestable>;

// interactables

export const SapOre = ComponentCreator.tag("SapOre");

// \interactables

export const InteractableComponents = {
    Interactable,
    Interacting,
    CannotInteract,
    Harvestable,
    TestInteractable,
    SapOre,
};
