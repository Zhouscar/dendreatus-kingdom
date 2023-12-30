import { produce } from "@rbxts/immut";
import { useGuidPool } from "shared/features/guidUtils";
import { Item } from "shared/features/items/types";
import { PlayerInventory } from "shared/store/players/types";

function immutSetItemAt(
    inventory: PlayerInventory,
    index: number,
    item: Item | undefined,
    guidPool: string[],
): PlayerInventory {
    return produce(inventory, (draft) => {
        const getGuid = useGuidPool(guidPool);

        const guid = item !== undefined ? getGuid() : undefined;
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
