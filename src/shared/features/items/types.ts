import { t } from "@rbxts/t";

export interface Item {
    readonly itemType: ItemType;
    readonly stack: number;
    readonly unique: boolean;

    readonly consumeStage?: number;
}

export type ItemComponentType = "weapon" | "relics" | "consumable";

export const isItemType = t.literal("stick", "bigger_stick", "crucifix_dagger", "mushroom_soup");
export type ItemType = t.static<typeof isItemType>;
