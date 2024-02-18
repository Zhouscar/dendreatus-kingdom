import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { ItemComponentType, ItemType } from "./types";

export type ItemConstant = {
    readonly name: string;
    readonly itemType: ItemType;
    readonly itemComponentTypes: ItemComponentType[];
    readonly stackSize: number;
    readonly image: string;
    readonly description: string;
};

export type ItemConstants = ReadonlyMap<ItemType, ItemConstant>;

export const ITEM_CONSTANTS: ItemConstants = new ReadonlyMap([
    [
        "stick",
        {
            name: "Stick",
            itemType: "stick",
            itemComponentTypes: [],
            stackSize: 30,
            image: withAssetPrefix("14942969504"),
            description:
                "Richard Paul Astley (born 6 February 1966) is an English singer who has been active in music for several decades",
        },
    ],
    [
        "bigger_stick",
        {
            name: "Bigger Stick",
            itemType: "bigger_stick",
            itemComponentTypes: [],
            stackSize: 20,
            image: withAssetPrefix("14942969504"),
            description: "WHA",
        },
    ],
    [
        "crucifix_dagger",
        {
            name: "Crucifix Dagger",
            itemType: "crucifix_dagger",
            itemComponentTypes: ["weapon"],
            stackSize: 1,
            image: withAssetPrefix("16348933235"),
            description:
                "So the crucifix dagger is one of the weapons that could be used but I'm trying to figure out how players would even obtain these objects \nactually, scratch that.",
        },
    ],
]);
