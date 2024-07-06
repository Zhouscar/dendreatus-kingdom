import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { ItemType } from "shared/features/items/types";

function descriptionOf(itemType: ItemType): string | undefined {
    return ITEM_CONTEXTS[itemType].description;
}

export = descriptionOf;
