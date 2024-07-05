import { produce } from "@rbxts/immut";
import { PlayerInventory } from "shared/store/players/types";

function immutRemoveItemByGuid(inventory: PlayerInventory, guid: string) {
    return produce(inventory, (draft) => {
        if (draft.items.get(guid)?.soulbound) {
            warn("Cannot remove soulbound items");
            return;
        }

        draft.slots.forEach((slot, index) => {
            if (slot.itemGuid === guid) {
                draft.slots[index].itemGuid = undefined;
            }
        });
        draft.items.delete(guid);
    });
}

export = immutRemoveItemByGuid;
