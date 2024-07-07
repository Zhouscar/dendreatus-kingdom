import { PlayerInventory } from "shared/store/players/types";
import { produce } from "@rbxts/immut";

function immutClearInventoryKeepSoulbound(inventory: PlayerInventory) {
    return produce(inventory, (draft) => {
        draft.items.forEach((item, guid) => {
            if (item.soulbound) return;

            draft.items.delete(guid);
            draft.slots.forEach((slot, i) => {
                if (slot.itemGuid !== guid) return;
                slot.itemGuid === undefined;
            });
        });
    });
}

export = immutClearInventoryKeepSoulbound;
