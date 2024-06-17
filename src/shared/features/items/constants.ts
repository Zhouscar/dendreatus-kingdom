import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { ItemComponentType, ItemType } from "./types";

export type ItemContext = {
    readonly name: string;
    readonly itemType: ItemType;
    readonly itemComponentTypes: ItemComponentType[];
    readonly stackSize: number;
    readonly image: string;
    readonly description: string;
};

export type ItemContexts = ReadonlyMap<ItemType, ItemContext>;

export const ITEM_CONTEXTS: ItemContexts = new ReadonlyMap([
    [
        "stick",
        {
            name: "stick",
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
            name: "Bigger Sos.clock",
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
    [
        "mushroom_soup",
        {
            name: "Mushroom Soup",
            itemType: "mushroom_soup",
            itemComponentTypes: ["consumable"],
            stackSize: 1,
            image: withAssetPrefix("16349074550"),
            description: "",
        },
    ],
    [
        "sap",
        {
            name: "Sap",
            itemType: "sap",
            itemComponentTypes: [],
            stackSize: 10,
            image: withAssetPrefix("16349184242"),
            description: "TODO",
        },
    ],
    [
        "egg",
        {
            name: "Egg",
            itemType: "egg",
            itemComponentTypes: [],
            stackSize: 10,
            image: withAssetPrefix("17165290853"),
            description: "TODO",
        }, // TODO: egg item as tool
    ],
    [
        "flour",
        {
            name: "Flour",
            itemType: "flour",
            itemComponentTypes: [],
            stackSize: 10,
            image: withAssetPrefix("17165267270"),
            description: "TODO",
        }, // TODO: flour item as tool
    ],
    [
        "mushroom",
        {
            name: "Mushroom",
            itemType: "mushroom",
            itemComponentTypes: [],
            stackSize: 10,
            image: withAssetPrefix("13033967093"),
            description: "TODO",
        }, // TODO: mushroom item as tool
    ],
    [
        "scrap_metal",
        {
            name: "Scrap Metal",
            itemType: "scrap_metal",
            itemComponentTypes: [],
            stackSize: 10,
            image: withAssetPrefix("17165197728"),
            description: "TODO",
        },
    ],
    [
        "rope",
        {
            name: "Rope",
            itemType: "rope",
            itemComponentTypes: [],
            stackSize: 10,
            image: withAssetPrefix("17134358548"),
            description: "TODO",
        },
    ],
    [
        "nails",
        {
            name: "Nails",
            itemType: "nails",
            itemComponentTypes: [],
            stackSize: 10,
            image: withAssetPrefix("17165310845"),
            description: "TODO",
        },
    ],
    [
        "scrap_blade",
        {
            name: "Scrap Blade",
            itemType: "scrap_blade",
            itemComponentTypes: [],
            stackSize: 1,
            image: withAssetPrefix("17837106969"),
            description: "TODO",
        },
    ],
    [
        "spikeball",
        {
            name: "Spikeball",
            itemType: "spikeball",
            itemComponentTypes: [],
            stackSize: 10,
            image: withAssetPrefix("17837113516"),
            description: "TODO",
        },
    ],
]);
