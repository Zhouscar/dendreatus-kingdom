import { produce } from "@rbxts/immut";
import { ITEM_CONSUMABLE_CONTEXTS } from "shared/features/items/consumables";
import { PlayerInventory } from "shared/store/players/types";
import immutRemoveItemByGuid from "./immutRemoveItemByGuid";

function immutConsumeItem(inventory: PlayerInventory, guid: string) {
    const item = inventory.items.get(guid);
    if (!item) {
        warn("No item");
        return inventory;
    }

    const context = ITEM_CONSUMABLE_CONTEXTS.get(item.itemType);
    if (!context) {
        warn("Item is not a consumable");
        return inventory;
    }

    let nextConsumeStage = 0;
    if (item.consumeStage !== undefined) {
        nextConsumeStage = item.consumeStage + 1;
    }

    if (nextConsumeStage >= context.stageAnimationIds.size() - 1) {
        return immutRemoveItemByGuid(inventory, guid);
    }

    return produce(inventory, (draft) => {
        const item = draft.items.get(guid)!;
        item.consumeStage = nextConsumeStage;
    });
}

export = immutConsumeItem;
