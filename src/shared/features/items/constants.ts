import { ItemComponentType, ItemType } from "./types";

export type ItemConstant = {
    readonly name: string;
    readonly itemType: ItemType;
    readonly itemComponentTypes: ItemComponentType[];
    readonly stackSize: number;
    readonly image: string;
    readonly description: string;
};

export type ItemConstants = Map<ItemType, ItemConstant>;

export const ITEM_CONSTANTS: ItemConstants = new Map([
    [
        "stick",
        {
            name: "Stick",
            itemType: "stick",
            itemComponentTypes: [],
            stackSize: 30,
            image: "TODO:",
            description: "Hi",
        },
    ],
]);
