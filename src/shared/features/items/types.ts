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
    "survivor_lantern", // TODO: setup
    "noble_lantern", // TODO: setup
    "ritualist_candle", // TODO: setup
    "sword", // TODO: setup
    "royal_lantern", // TODO: setup
    "owner_lantern", // TODO: setup
);
export type ItemType = t.static<typeof isItemType>;
