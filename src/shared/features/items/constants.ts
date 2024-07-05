import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { ItemType } from "./types";

export type ItemContext = {
    readonly name: string;
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
            name: "Bigger Stick",
            stackSize: 20,
            image: withAssetPrefix("14942969504"),
            description: "WHA",
        },
    ],
    [
        "crucifix_dagger",
        {
            name: "Crucifix Dagger",
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
            stackSize: 1,
            image: withAssetPrefix("16349074550"),
            description: "",
        },
    ],
    [
        "sap",
        {
            name: "Sap",
            stackSize: 10,
            image: withAssetPrefix("16349184242"),
            description: "TODO",
        },
    ],
    [
        "egg",
        {
            name: "Egg",
            stackSize: 16,
            image: withAssetPrefix("17165290853"),
            description: "TODO",
        },
    ],
    [
        "flour",
        {
            name: "Flour",
            stackSize: 16,
            image: withAssetPrefix("17165267270"),
            description: "TODO",
        },
    ],
    [
        "mushroom",
        {
            name: "Mushroom",
            stackSize: 16,
            image: withAssetPrefix("13033967093"),
            description: "TODO",
        },
    ],
    [
        "scrap_metal",
        {
            name: "Scrap Metal",
            stackSize: 16,
            image: withAssetPrefix("17165197728"),
            description: "TODO",
        },
    ],
    [
        "rope",
        {
            name: "Rope",
            stackSize: 16,
            image: withAssetPrefix("17134358548"),
            description: "TODO",
        },
    ],
    [
        "nails",
        {
            name: "Nails",
            stackSize: 16,
            image: withAssetPrefix("17165310845"),
            description: "TODO",
        },
    ],
    [
        "scrap_blade",
        {
            name: "Scrap Blade",
            stackSize: 1,
            image: withAssetPrefix("17837106969"),
            description: "TODO",
        },
    ],
    [
        "spikeball",
        {
            name: "Spikeball",
            stackSize: 16,
            image: withAssetPrefix("17837113516"),
            description: "TODO",
        },
    ],
    [
        "survivor_lantern",
        {
            name: "Survivor Lantern",
            stackSize: 1,
            image: withAssetPrefix("17837210489"),
            description: "TODO",
        },
    ],
    [
        "noble_lantern",
        {
            name: "Noble Lantern",
            stackSize: 1,
            image: withAssetPrefix("13031282551"),
            description: "TODO",
        },
    ],
    [
        "ritualist_candle",
        {
            name: "Ritualist Candle",
            stackSize: 1,
            image: withAssetPrefix("16371192204"),
            description: "TODO",
        },
    ],
    [
        "sword",
        {
            name: "Sword",
            stackSize: 1,
            image: withAssetPrefix("17837162667"),
            description: "TODO",
        },
    ],
    [
        "royal_lantern",
        {
            name: "Royal Lantern",
            stackSize: 1,
            image: withAssetPrefix("18253625612"),
            description: "TODO",
        },
    ],
    [
        "owner_lantern",
        {
            name: "Owner Lantern",
            stackSize: 1,
            image: withAssetPrefix("16384697540"),
            description: "TODO",
        },
    ],
]);
