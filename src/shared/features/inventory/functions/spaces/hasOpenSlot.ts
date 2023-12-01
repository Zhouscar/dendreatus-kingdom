import { PlayerInventory } from "shared/reflex/slices/players/types";

function hasOpenSlot(inventory: PlayerInventory): boolean {
    for (const slot of inventory.slots) {
        if (slot.itemGuid === undefined) {
            return true;
        }
    }
    return false;
}

export = hasOpenSlot;
