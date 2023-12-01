import { ItemType } from "shared/features/items/types";
import { PlayerInventory } from "shared/reflex/slices/players/types";
import stackSizeOf from "../getters/stackSizeOf";
import { canPutItems } from "../spaces";
import { produce } from "@rbxts/immut";
import newGuid from "shared/features/newGuid";
import { RECONCILE_INVENTORY } from "../../constants";

function immutPutItems(inventory: PlayerInventory, itemType: ItemType, amount: number) {
    const stackSize = stackSizeOf(itemType);
    if (stackSize === undefined) {
        warn(`There is no stacksize attribute for item ${itemType}`);
        return inventory;
    }
    if (!canPutItems(inventory, itemType, amount)) {
        warn("Can't put items");
        return inventory;
    }
    return produce(inventory, (draft) => {
        draft.slots.reduce((amountToPut, slot): number => {
            assert(amountToPut >= 0, "Amount to put should be less than 0");
            if (amountToPut === 0) {
                return 0;
            }
            if (slot.itemGuid === undefined) {
                // no item at slot
                // put item here

                const amountToPutHere = math.min(stackSize, amountToPut);
                slot.itemGuid = newGuid();
                draft.items[slot.itemGuid] = {
                    itemType: itemType,
                    stack: amountToPutHere,
                    unique: false,
                };
                return amountToPut - amountToPutHere;
            }
            const item = draft.items[slot.itemGuid];
            if (item === undefined) {
                // no item at guid (should not be possible)
                // put item here if RECONCILE_INVENTORY is allowed

                if (RECONCILE_INVENTORY) {
                    const amountToPutHere = math.min(stackSize, amountToPut);
                    slot.itemGuid = newGuid();
                    draft.items[slot.itemGuid] = {
                        itemType: itemType,
                        stack: amountToPutHere,
                        unique: false,
                    };
                    return amountToPut - amountToPutHere;
                } else {
                    return amountToPut;
                }
            }

            if (item.itemType === itemType && item.stack < stackSize && !item.unique) {
                // itemType is the same and the slot is not full and the item is not unqiue
                // will not use unique item counts because that is only to be used in taking items and not inserting

                const amountToPutHere = math.min(amountToPut, stackSize - item.stack);
                item.stack += amountToPutHere;
                return amountToPut - amountToPutHere;
            }

            // every other cases do not put item
            return amountToPut;
        }, amount);

        return draft;
    });
}

export = immutPutItems;
