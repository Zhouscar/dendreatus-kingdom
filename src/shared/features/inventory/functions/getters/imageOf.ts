import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { ItemType } from "shared/features/items/types";

function imageOf(itemType: ItemType): string | undefined {
    return ITEM_CONTEXTS[itemType].image;
}

export = imageOf;
