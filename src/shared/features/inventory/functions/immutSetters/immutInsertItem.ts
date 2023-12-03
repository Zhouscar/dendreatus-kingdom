import { Item } from "shared/features/items/types";
import { PlayerInventory } from "shared/store/slices/players/types";
import hasOpenSlot from "../spaces/hasOpenSlot";
import { produce } from "@rbxts/immut";
import newGuid from "shared/features/newGuid";

function immutInsertItem(inventory: PlayerInventory, item: Item): PlayerInventory {
    if (!hasOpenSlot(inventory)) {
        warn("No open slots for inventory");
        return inventory;
    }
    return produce(inventory, (draft) => {
        let hasInserted = false;
        draft.slots.forEach((slot) => {
            if (hasInserted) return;
            if (slot.itemGuid === undefined) {
                slot.itemGuid = newGuid();
                draft.items[slot.itemGuid] = item;
                hasInserted = true;
                return;
            }
        });

        return draft;
    });
}

export = immutInsertItem;
