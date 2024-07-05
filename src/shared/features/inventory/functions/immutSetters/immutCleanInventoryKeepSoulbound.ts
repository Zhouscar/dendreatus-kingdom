import { ItemType } from "shared/features/items/types";
import { PlayerInventory } from "shared/store/players/types";
import { produce } from "@rbxts/immut";

function immutClearInventoryKeepSoulbound(inventory: PlayerInventory) {
    return produce(inventory, (draft) => {
        draft.items.forEach((item, guid) => {
            if (item.soulbound) return;

            draft.items.delete(guid);
            draft.slots.forEach((slot, i) => {
                if (slot.itemGuid !== guid) return;
                draft.slots[i].itemGuid === undefined;
            });
        });
    });
}

export = immutClearInventoryKeepSoulbound;
