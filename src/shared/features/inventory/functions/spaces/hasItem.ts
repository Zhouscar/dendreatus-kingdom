import { ItemType } from "shared/features/items/types";
import { PlayerInventory } from "shared/store/players/types";
import amountOf from "./amountOf";

function hasItem(inventory: PlayerInventory, itemType: ItemType) {
    return amountOf(inventory, itemType) > 0;
}

export = hasItem;
