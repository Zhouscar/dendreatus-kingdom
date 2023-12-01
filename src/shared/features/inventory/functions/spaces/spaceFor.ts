import { ItemType } from "shared/features/items/types";
import { PlayerInventory } from "shared/reflex/slices/players/types";
import { stackSizeOf } from "../getters";
import { INVENTORY_SLOT_SIZE } from "../../constants";

function spaceFor(inventory: PlayerInventory, itemType: ItemType): number {
    const stackSize = stackSizeOf(itemType);
    if (stackSize === undefined) {
        warn(`There is no stackSize attribute for item ${itemType}`);
        return 1;
    }
    return inventory.slots.reduce((space, slot) => {
        if (slot.itemGuid === undefined) {
            // no item at slot
            return space;
        }
        const item = inventory.items[slot.itemGuid];
        if (item === undefined) {
            // no item at the guid (should not be possible)
            warn(`No item at guid ${slot.itemGuid}`);
            return space;
        }
        if (item.itemType !== itemType) {
            // not the same itemType at slot
            return space - stackSize;
        }
        if (item.unique) {
            // itemType unique at slot
            return space - stackSize;
        }
        // itemType not unique and the same type at slot
        return space - item.stack;
    }, INVENTORY_SLOT_SIZE * stackSize);
}

export = spaceFor;
