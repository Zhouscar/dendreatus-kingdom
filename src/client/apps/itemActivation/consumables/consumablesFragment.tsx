import Roact from "@rbxts/roact";
import Sift from "@rbxts/sift";
import { ITEM_ATTACKABLE_CONTEXTS } from "shared/features/items/attackables";
import { ItemAttackableType, ItemConsumableType } from "shared/features/items/types";
import ConsumableItem from "./consumableItem";
import { ITEM_CONSUMABLE_CONTEXTS } from "shared/features/items/consumables";

export default function ItemConsumablesFragments(props: {}) {
    const elements: Map<ItemConsumableType, Roact.Element> = new Map();

    Sift.Dictionary.keys(ITEM_CONSUMABLE_CONTEXTS).forEach((itemType) => {
        elements.set(itemType, <ConsumableItem itemType={itemType} />);
    });

    return <>{elements}</>;
}
