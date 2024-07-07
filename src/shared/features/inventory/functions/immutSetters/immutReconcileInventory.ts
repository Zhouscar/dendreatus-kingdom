import { produce } from "@rbxts/immut";
import { PlayerInventory } from "shared/store/players/types";

function immutReconcileInventory(inventory: PlayerInventory) {
    return produce(inventory, (draft) => {
        draft.slots.forEach((slot, i) => {
            const itemGuid = slot.itemGuid;
            if (itemGuid === undefined) return;
            if (draft.items.has(itemGuid)) return;
            slot.itemGuid = undefined;
        });

        draft.items.forEach((_item, itemGuid) => {
            let itemInSlot = false;
            draft.slots.forEach((slot) => {
                if (slot.itemGuid === itemGuid) {
                    itemInSlot = true;
                }
            });
            if (!itemInSlot) {
                draft.items.delete(itemGuid);
            }
        });
    });
}

export = immutReconcileInventory;
