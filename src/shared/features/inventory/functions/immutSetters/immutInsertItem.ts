import { Item } from "shared/features/items/types";
import { PlayerInventory } from "shared/store/players/types";
import hasOpenSlot from "../spaces/hasOpenSlot";
import { produce } from "@rbxts/immut";
import { useGuidPool } from "shared/features/guidUtils";

function immutInsertItem(
    inventory: PlayerInventory,
    item: Item,
    guidPool: string[],
): PlayerInventory {
    if (!hasOpenSlot(inventory)) {
        warn("No open slots for inventory");
        return inventory;
    }
    return produce(inventory, (draft) => {
        const getGuid = useGuidPool(guidPool);

        let hasInserted = false;
        draft.slots.forEach((slot) => {
            if (hasInserted) return;
            if (slot.itemGuid === undefined) {
                slot.itemGuid = getGuid();
                draft.items.set(slot.itemGuid, item);
                hasInserted = true;
                return;
            }
        });

        return draft;
    });
}

export = immutInsertItem;
