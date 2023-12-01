import { ItemType } from "shared/features/items/types";
import { PlayerInventory } from "shared/reflex/slices/players/types";
import { canTakeItems } from "../spaces";
import { produce } from "@rbxts/immut";
import { RECONCILE_INVENTORY, UNIQUE_TYPE_COUNTS as UNIQUE_ITEM_COUNTS } from "../../constants";

function immutTakeItems(inventory: PlayerInventory, itemType: ItemType, amount: number) {
    if (!canTakeItems(inventory, itemType, amount)) {
        warn("Can't take items");
        return inventory;
    }
    return produce(inventory, (draft) => {
        draft.slots.reduce((amountToTake, slot): number => {
            assert(amountToTake >= 0, "Amount to take can't be less than 0");
            if (amountToTake === 0) {
                return 0;
            }

            if (slot.itemGuid === undefined) {
                // no item at slot
                // should do nothing

                return amountToTake;
            }
            const item = draft.items[slot.itemGuid];
            if (item === undefined) {
                // no item at guid (should not be possible)
                // reconciles to remove it

                if (RECONCILE_INVENTORY) {
                    slot.itemGuid = undefined;
                }

                return amountToTake;
            }
            if (itemType !== item.itemType) {
                // not a matching item
                // skip it

                return amountToTake;
            }
            // rest of it is with matching itemTypes
            if (item.unique && !UNIQUE_ITEM_COUNTS) {
                // unique item and UNIQUE_ITEM_COUNTS is not allowed
                // skip it

                return amountToTake;
            }
            // now the item is matching and not unique
            // leaving two choices: eithrEr remove the item or decrease the stack
            const amountToTakeHere = math.min(amountToTake, item.stack);
            if (amountToTakeHere === item.stack) {
                // remove the item entirely
                draft.items[slot.itemGuid] = undefined;
                slot.itemGuid = undefined;
                return amountToTake - amountToTakeHere;
            } else {
                // decrease the stack
                item.stack -= amountToTakeHere;
                return amountToTake - amountToTakeHere;
            }
        }, amount);

        return draft;
    });
}

export = immutTakeItems;
