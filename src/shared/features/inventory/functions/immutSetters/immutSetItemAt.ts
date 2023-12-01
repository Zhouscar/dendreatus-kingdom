import { produce } from "@rbxts/immut";
import { Item } from "shared/features/items/types";
import newGuid from "shared/features/newGuid";
import { PlayerInventory } from "shared/reflex/slices/players/types";

function immutSetItemAt(
    inventory: PlayerInventory,
    index: number,
    item: Item | undefined,
): PlayerInventory {
    return produce(inventory, (draft) => {
        const guid = item !== undefined ? newGuid() : undefined;
        if (draft.slots[index].itemGuid !== undefined) {
            draft.items[draft.slots[index].itemGuid!] = undefined;
        }
        if (guid !== undefined) {
            draft.items[guid] = item;
        }
        draft.slots[index].itemGuid = guid;
    });
}

export = immutSetItemAt;
