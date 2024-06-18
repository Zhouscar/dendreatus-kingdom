import { Item, ItemType } from "shared/features/items/types";
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

export const Interacted = ComponentCreator.bidirectional<{
    player: Player;
    interactType: InteractType;
    interactTime: number;
}>("Interacted");
export type Interacted = ReturnType<typeof Interacted>;

export const TestInteractable = ComponentCreator.tag("TestInteractable");
export type TestInteractable = ReturnType<typeof TestInteractable>;

export const CannotInteract = ComponentCreator.replicated<{ reason: CannotInteractReason }>(
    "CannotInteract",
);
export type CannotInteract = ReturnType<typeof CannotInteract>;

export const LocalCannotInteract = ComponentCreator.base<{ reason: CannotInteractReason }>(
    "LocalCannotInteract",
);
export type LocalCannotInteract = ReturnType<typeof LocalCannotInteract>;

export const Harvestable = ComponentCreator.replicated<{
    itemType: ItemType;
    amountLeftToHarvest: number;
}>("Harvestable");
export type Harvestable = ReturnType<typeof Harvestable>;

export const Cookable = ComponentCreator.replicated<{
    items: { item: Item | undefined }[];
}>("Cookable");
export type Cookable = ReturnType<typeof Cookable>;

export const Craftable = ComponentCreator.replicated<{
    items: { item: Item | undefined }[];
}>("Craftable");
export type Craftable = ReturnType<typeof Craftable>;

export const DoorLike = ComponentCreator.bidirectional<{
    state: "opening" | "closing" | "opened" | "closed";
    openingOrClosingStartTime: number;
    openDuration: number;
    closeDuration: number;
}>("DoorLike");
export type DoorLike = ReturnType<typeof DoorLike>;

// interactables

export const CraftTable = ComponentCreator.tag("CraftTable");
export type CraftTable = ReturnType<typeof CraftTable>;

export const SapOre = ComponentCreator.tag("SapOre");
export type SapOre = ReturnType<typeof SapOre>;

export const CookTable = ComponentCreator.tag("CookTable");
export type CookTable = ReturnType<typeof CookTable>;

export const Door = ComponentCreator.tag("Door");
export type Door = ReturnType<typeof Door>;

// \interactables

export const InteractableComponents = {
    Interactable,
    Interacted,
    CannotInteract,
    LocalCannotInteract,
    Harvestable,
    Cookable,
    TestInteractable,
    SapOre,
    CookTable,
    CraftTable,
    Craftable,
    Door,
    DoorLike,
};
