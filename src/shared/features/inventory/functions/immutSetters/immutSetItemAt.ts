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
            if (draft.items.get(draft.slots[index].itemGuid!)?.soulbound) {
                warn("Cannot remove soulbound items");
                return;
            }

            draft.items.delete(draft.slots[index].itemGuid!);
        }
        if (guid !== undefined) {
            if (item !== undefined) {
                draft.items.set(guid, item);
            } else {
                draft.items.delete(guid);
            }
        }
        draft.slots[index].itemGuid = guid;
    });
}

export = immutSetItemAt;
