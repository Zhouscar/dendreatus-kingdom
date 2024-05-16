import { produce } from "@rbxts/immut";
import { PlayerInventory } from "shared/store/players/types";
import stackSizeOf from "../getters/stackSizeOf";

function immutSwapItems(inventory: PlayerInventory, from: number, to: number) {
    return produce(inventory, (draft) => {
        // item -- undefined should switch
        // different types should switch
        // same types and unique should fill the "from" to the "to"

        const fromGuid = draft.slots[from].itemGuid;
        const toGuid = draft.slots[to].itemGuid;
        if (
            fromGuid !== undefined &&
            toGuid !== undefined &&
            draft.items.get(fromGuid)?.itemType === draft.items.get(toGuid)?.itemType
        ) {
            // should fill
            // remove item from the from if completely filled
            const fromItem = draft.items.get(fromGuid);
            const toItem = draft.items.get(toGuid);

            if (fromItem === undefined || toItem === undefined) return;
            const itemType = fromItem.itemType;

            const stackSize = stackSizeOf(itemType);
            if (stackSize === undefined) {
                warn(`There is no stackSize attribute for item ${itemType}`);
                return inventory;
            }

            const amountToFill = math.min(fromItem.stack, stackSize - toItem.stack);

            // from item could be removed
            if (amountToFill === fromItem.stack) {
                draft.items.delete(fromGuid);
                draft.slots[from].itemGuid = undefined;
            } else {
                fromItem.stack -= amountToFill;
            }

            toItem.stack += amountToFill;
        } else {
            // should swap
            draft.slots[from].itemGuid = toGuid;
            draft.slots[to].itemGuid = fromGuid;
        }
    });
}

export = immutSwapItems;
