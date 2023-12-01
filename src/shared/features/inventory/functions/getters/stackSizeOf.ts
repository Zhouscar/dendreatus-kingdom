import { ITEM_CONSTANTS } from "shared/features/items/constants";
import { ItemType } from "shared/features/items/types";

function stackSizeOf(itemType: ItemType): number | undefined {
    return ITEM_CONSTANTS.get(itemType)?.stackSize;
}

export = stackSizeOf;
