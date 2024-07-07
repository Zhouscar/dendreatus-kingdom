import Roact from "@rbxts/roact";
import Sift from "@rbxts/sift";
import { ITEM_ATTACKABLE_CONTEXTS } from "shared/features/items/attackables";
import { ItemAttackableType } from "shared/features/items/types";
import AttackableItem from "./attackableItem";

export default function ItemAttackablesFragments(props: {}) {
    const elements: Map<ItemAttackableType, Roact.Element> = new Map();

    Sift.Dictionary.keys(ITEM_ATTACKABLE_CONTEXTS).forEach((itemType) => {
        elements.set(itemType, <AttackableItem itemType={itemType} />);
    });

    return <>{elements}</>;
}
