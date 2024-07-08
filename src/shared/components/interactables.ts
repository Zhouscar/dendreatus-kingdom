import variantModule, { fields, TypeNames, VariantOf } from "@rbxts/variant";
import { InteractType } from "shared/features/interactables/types";
import { Item, ItemType } from "shared/features/items/types";
import { WithDuration } from "shared/features/types";
import { ComponentCreator } from "./creators";
import { Workspace } from "@rbxts/services";
import { AnyEntity } from "@rbxts/matter";

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
    interactTime: number;
}>("Interacting");
export type Interacting = ReturnType<typeof Interacting>;

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

export const CookTable = ComponentCreator.tag("CookTable");
export type CookTable = ReturnType<typeof CookTable>;

export const Door = ComponentCreator.tag("Door");
export type Door = ReturnType<typeof Door>;

export const SapOre = ComponentCreator.tag("SapOre");
export type SapOre = ReturnType<typeof SapOre>;

export const OldMechanicsBarrel = ComponentCreator.tag("OldMechanicsBarrel");
export type OldMechanicsBarrel = ReturnType<typeof OldMechanicsBarrel>;

export const Herbs = ComponentCreator.tag("Herbs");
export type Herbs = ReturnType<typeof Herbs>;

export const BoneClusterOrPiles = ComponentCreator.tag("BoneClusterOrPiles");
export type BoneClusterOrPiles = ReturnType<typeof BoneClusterOrPiles>;

export const ShipScraps = ComponentCreator.tag("ShipScraps");
export type ShipScraps = ReturnType<typeof ShipScraps>;

export const RemainsBag = ComponentCreator.tag("RemainsBag");
export type RemainsBag = ReturnType<typeof RemainsBag>;

export const OldBarrel = ComponentCreator.tag("OldBarrel");
export type OldBarrel = ReturnType<typeof OldBarrel>;

export const FlourBags = ComponentCreator.tag("FlourBags");
export type FlourBags = ReturnType<typeof FlourBags>;

export const BirdNest = ComponentCreator.tag("BirdNest");
export type BirdNest = ReturnType<typeof BirdNest>;

export const MushroomBush = ComponentCreator.tag("MushroomBush");
export type MushroomBush = ReturnType<typeof MushroomBush>;

export const Humberbell = ComponentCreator.tag("Humberbell");
export type Humberbell = ReturnType<typeof Humberbell>;

export const GoyaBush = ComponentCreator.tag("GoyaBush");
export type GoyaBush = ReturnType<typeof GoyaBush>;

export const Waypointer = ComponentCreator.tag("Waypointer");
export type Waypointer = ReturnType<typeof Waypointer>;

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
    OldMechanicsBarrel,
    Herbs,
    BoneClusterOrPiles,
    ShipScraps,
    RemainsBag,
    OldBarrel,
    FlourBags,
    BirdNest,
    MushroomBush,
    Humberbell,
    GoyaBush,
    Waypointer,
};
