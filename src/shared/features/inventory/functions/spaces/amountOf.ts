import { ItemType } from "shared/features/items/types";
import { PlayerInventory } from "shared/store/slices/players/types";
import { UNIQUE_TYPE_COUNTS } from "../../constants";

function amountOf(inventory: PlayerInventory, itemType: ItemType): number {
    return inventory.slots.reduce((amount, slot) => {
        if (slot.itemGuid === undefined) {
            // no item at slot
            return amount;
        }
        const item = inventory.items[slot.itemGuid];
        if (item === undefined) {
            // no item at the guid (should not be possible)
            return amount;
        }
        if (item.itemType !== itemType) {
            // not the same itemType at slot
            return amount;
        }
        if (item.unique && !UNIQUE_TYPE_COUNTS) {
            // item unique but unique type doesn't count
            return amount;
        }
        // item can be counted
        return amount + item.stack;
    }, 0);
}

export = amountOf;
