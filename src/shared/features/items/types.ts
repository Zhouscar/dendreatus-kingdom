import { t } from "@rbxts/t";

export interface Item {
    readonly itemType: ItemType;
    readonly stack: number;

    readonly consumeStage?: number;
}

export type ItemComponentType = "weapon" | "relics" | "consumable";

export const isItemType = t.literal(
    "stick",
    "bigger_stick",
    "crucifix_dagger",
    "mushroom_soup",
    "sap",
    "egg",
    "flour",
    "mushroom",
    "scrap_metal", // TODO
    "rope", // TODO
    "nails", // TODO
    "spikeball", // TODO
    "scrap_blade", // TODO
);
export type ItemType = t.static<typeof isItemType>;
