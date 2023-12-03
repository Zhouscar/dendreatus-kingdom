import { ItemType } from "shared/features/items/types";
import { PlayerInventory } from "shared/store/slices/players/types";
import spaceFor from "./spaceFor";

function canPutItems(inventory: PlayerInventory, itemType: ItemType, amount: number): boolean {
    return spaceFor(inventory, itemType) >= amount;
}

export = canPutItems;
