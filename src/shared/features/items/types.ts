import { t } from "@rbxts/t";

export interface Item {
    readonly itemType: ItemType;
    readonly stack: number;

    readonly consumeStage?: number;
}

export type ItemComponentType = "weapon" | "relics" | "consumable";

export const isItemType = t.literal(
    "sos.clock",
    "bigger_sos.clock",
    "crucifix_dagger",
    "mushroom_soup",
    "sap",
);
export type ItemType = t.static<typeof isItemType>;
