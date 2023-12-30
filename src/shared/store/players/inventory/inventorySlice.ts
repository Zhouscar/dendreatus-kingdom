import { createProducer } from "@rbxts/reflex";
import { PlayerData, PlayerInventory } from "../types";
import { Item, ItemType } from "shared/features/items/types";
import inventoryImmutSetters from "shared/features/inventory/functions/immutSetters";
import { createGuidPool } from "shared/features/guidUtils";

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

    insertItem: (state, plr: string, item: Item, guidPool: string[]) => {
        const inventory = state[plr];
        if (inventory === undefined) return state;
        return {
            ...state,
            [plr]: inventoryImmutSetters.immutInsertItem(inventory, item, guidPool),
        };
    },

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
});
