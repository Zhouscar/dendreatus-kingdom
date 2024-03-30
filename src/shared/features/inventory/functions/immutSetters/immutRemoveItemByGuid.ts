import { produce } from "@rbxts/immut";
import { PlayerInventory } from "shared/store/players/types";

function immutRemoveItemByGuid(inventory: PlayerInventory, guid: string) {
    return produce(inventory, (draft) => {
        draft.slots.forEach((slot, index) => {
            if (slot.itemGuid === guid) {
                draft.slots.remove(index);
            }
        });
        draft.items.delete(guid);
    });
}

export = immutRemoveItemByGuid;
