import { ComponentCtor } from "@rbxts/matter/lib/component";
import { ItemType } from "../items/types";
import { SapOre } from "shared/components/interactables";

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
]);
