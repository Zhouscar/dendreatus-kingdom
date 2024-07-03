import { createProducer } from "@rbxts/reflex";
import { PlayerData, PlayerInventory } from "../types";
import { Item, ItemType } from "shared/features/items/types";
import inventoryImmutSetters from "shared/features/inventory/functions/immutSetters";
import { defaultPlayerInventory } from "./inventoryDefaults";

export interface InventoryState {
    [plr: string]: PlayerInventory | undefined;
}

const initState: InventoryState = {};

export const inventorySlice = createProducer(initState, {
    loadPlayerData: (state, plr: string, data: PlayerData) => ({
        ...state,
        [plr]: data.inventory,
    }),

    closePlayerData: (state, plr: string) => ({
        ...state,
        [plr]: undefined,
    }),

    consumeItem: (state, plr: string, guid: string) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutConsumeItem(inventory, guid),
        };
    },

    clearInventory: (state, plr: string) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: defaultPlayerInventory,
        };
    },

    insertItem: (state, plr: string, item: Item, guidPool: string[]) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutInsertItem(inventory, item, guidPool),
        };
    },

    // modifyItemAtGuid: (
    //     state,
    //     plr: string,
    //     guid: string,
    //     recipe: (draft: Draft<Item>) => Draft<Item> | void | undefined | Item,
    // ) => {
    //     const inventory = state[plr];
    //     if (inventory === undefined) return state;
    //     return {
    //         ...state,
    //         [plr]: inventoryImmutSetters.immutModifyItemAtGuid(inventory, guid, recipe),
    //     };
    // },

    putItems: (state, plr: string, itemType: ItemType, amount: number, guidPool: string[]) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutPutItems(inventory, itemType, amount, guidPool),
        };
    },

    removeItemAt: (state, plr: string, index: number) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutRemoveItemAt(inventory, index),
        };
    },

    removeItemByGuid: (state, plr: string, guid: string) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutRemoveItemByGuid(inventory, guid),
        };
    },

    setItemAt: (state, plr: string, index: number, item: Item, guidPool: string[]) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutSetItemAt(inventory, index, item, guidPool),
        };
    },

    swapItems: (state, plr: string, from: number, to: number) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutSwapItems(inventory, from, to),
        };
    },

    takeItems: (state, plr: string, itemType: ItemType, amount: number) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutTakeItems(inventory, itemType, amount),
        };
    },

    takeItemAtGuid: (state, plr: string, guid: string, amount: number) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutTakeItemsAtGuid(inventory, guid, amount),
        };
    },
});
