import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { ItemComponentType, ItemType } from "shared/features/items/types";

function itemComponentTypesOf(itemType: ItemType): ItemComponentType[] | undefined {
    return ITEM_CONTEXTS.get(itemType)?.itemComponentTypes;
}

export = itemComponentTypesOf;
