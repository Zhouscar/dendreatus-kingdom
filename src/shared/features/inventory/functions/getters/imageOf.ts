import { ITEM_CONSTANTS } from "shared/features/items/constants";
import { ItemType } from "shared/features/items/types";

function imageOf(itemType: ItemType): string | undefined {
    return ITEM_CONSTANTS.get(itemType)?.image;
}

export = imageOf;
