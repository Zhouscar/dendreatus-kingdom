import { t } from "@rbxts/t";

export interface Item {
    readonly itemType: ItemType;
    readonly stack: number;

    readonly soulbound?: boolean;
    readonly consumeStage?: number;
}

export const isItemType = t.literal(
    "stick",
    "bigger_stick",
    "crucifix_dagger",
    "mushroom_soup",
    "sap",
    "egg",
    "flour",
    "mushroom",
    "scrap_metal",
    "rope",
    "nails",
    "spikeball",
    "scrap_blade",
    "survivor_lantern",
    "noble_lantern",
    "ritualist_candle",
    "sword",
    "royal_lantern",
    "owner_lantern",
);
export type ItemType = t.static<typeof isItemType>;
