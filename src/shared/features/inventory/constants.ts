import { PlayerInventorySlot } from "./types";

function createEmptySlots() {
    const emptySlots: PlayerInventorySlot[] = [];
    for (let i = 0; i < INVENTORY_SLOT_SIZE; i++) {
        emptySlots.push({});
    }
    return emptySlots;
}

export const INVENTORY_SLOT_SIZE = 30;
export const UNIQUE_TYPE_COUNTS = true;
export const RECONCILE_INVENTORY = true;

export const EMPTY_SLOTS = createEmptySlots();
