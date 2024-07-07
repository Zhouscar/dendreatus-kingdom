import { ComponentCtor } from "@rbxts/matter/lib/component";
import { ItemType } from "../items/types";
import {
    BirdNest,
    BoneClusterOrPiles,
    FlourBags,
    GoyaBush,
    Herbs,
    Humberbell,
    MushroomBush,
    OldBarrel,
    OldMechanicsBarrel,
    RemainsBag,
    SapOre,
    ShipScraps,
} from "shared/components/interactables";

export const HARVESTABLE_COOLDOWN = 60;

export type HarvestableContext = {
    readonly itemType: ItemType;
    readonly amountBeforeCooldown: number;
};

export type HarvestableContexts = ReadonlyMap<ComponentCtor, HarvestableContext>;

export const HARVESTABLE_CONTEXTS: HarvestableContexts = new Map([
    [
        SapOre,
        {
            itemType: "sap",
            amountBeforeCooldown: 5,
        },
    ],
    [
        OldMechanicsBarrel,
        {
            itemType: "nails",
            amountBeforeCooldown: 5,
        },
    ],
    [
        Herbs,
        {
            itemType: "herbs",
            amountBeforeCooldown: 5,
        },
    ],
    [
        BoneClusterOrPiles,
        {
            itemType: "bones",
            amountBeforeCooldown: 5,
        },
    ],
    [
        ShipScraps,
        {
            itemType: "scrap_metal",
            amountBeforeCooldown: 5,
        },
    ],
    [
        RemainsBag,
        {
            itemType: "rope",
            amountBeforeCooldown: 5,
        },
    ],
    [
        OldBarrel,
        {
            itemType: "raw_pork",
            amountBeforeCooldown: 5,
        },
    ],
    [
        FlourBags,
        {
            itemType: "flour",
            amountBeforeCooldown: 5,
        },
    ],
    [
        BirdNest,
        {
            itemType: "egg",
            amountBeforeCooldown: 5,
        },
    ],
    [
        MushroomBush,
        {
            itemType: "mushroom",
            amountBeforeCooldown: 5,
        },
    ],
    [
        Humberbell,
        {
            itemType: "humberbell",
            amountBeforeCooldown: 5,
        },
    ],
    [
        GoyaBush,
        {
            itemType: "goya",
            amountBeforeCooldown: 5,
        },
    ],
]);
