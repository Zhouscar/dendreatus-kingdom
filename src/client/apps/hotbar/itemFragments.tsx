import Roact from "@rbxts/roact";
import { useSelector } from "@rbxts/roact-reflex";
import { selectPlayerInventory } from "shared/store/players/inventory";
import ItemSlot from "./itemSlot";
import { localPlr } from "client/localPlr";
import { AnyEntity, World } from "@rbxts/matter";
import { EquippingByIndex } from "shared/components/items";

export default function ItemFragments(props: {
    enabled: boolean;
    indexEquipped: number | undefined;
    from: number;
    to: number;
}) {
    const enabled = props.enabled;
    const indexEquipped = props.indexEquipped;
    const from = props.from;
    const to = props.to;

    const inventory = useSelector(selectPlayerInventory(localPlr));

    const items: Roact.Element[] = [];

    if (inventory !== undefined) {
        for (let i = from; i < to; i++) {
            const guid = inventory.slots[i].itemGuid;
            const item = guid !== undefined ? inventory.items.get(guid) : undefined;

            items.push(
                <ItemSlot enabled={enabled} item={item} equipped={i === indexEquipped}></ItemSlot>,
            );
        }
    }

    return <>{items}</>;
}
