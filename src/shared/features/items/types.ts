export interface Item {
    readonly itemType: ItemType;
    readonly stack: number;
    readonly unique: boolean;
}

export type ItemComponentType = "weapon" | "relics" | "consumable";

export type ItemType = "stick" | "bigger_stick" | "crucifix_dagger";
