import { PlayerInventory } from "shared/store/players/types";
import { produce } from "@rbxts/immut";

function immutTakeItemsAtGuid(inventory: PlayerInventory, guid: string, amount: number) {
    return produce(inventory, (draft) => {
        const item = draft.items.get(guid);
        if (item === undefined) {
            return draft;
        }
        if (item.soulbound) {
            warn("Cannot remove soulbound items");
            return draft;
        }

        if (item.stack < amount) {
            warn("Not enough to be taken from");
            return draft;
        }

        if (item.stack === amount) {
            draft.slots.forEach((slot, index) => {
                if (slot.itemGuid === guid) {
                    draft.slots[index].itemGuid = undefined;
                }
            });
            draft.items.delete(guid);
            return draft;
        }

        item.stack -= amount;
        return draft;
    });
}

export = immutTakeItemsAtGuid;
