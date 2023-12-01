import { ItemType } from "shared/features/items/types";
import { PlayerInventory } from "shared/reflex/slices/players/types";
import amountOf from "./amountOf";

function canTakeItems(inventory: PlayerInventory, itemType: ItemType, amount: number): boolean {
    return amountOf(inventory, itemType) >= amount;
}

export = canTakeItems;
