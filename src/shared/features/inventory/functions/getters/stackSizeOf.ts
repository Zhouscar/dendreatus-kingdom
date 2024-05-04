import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { ItemType } from "shared/features/items/types";

function stackSizeOf(itemType: ItemType): number | undefined {
    return ITEM_CONTEXTS.get(itemType)?.stackSize;
}

export = stackSizeOf;
