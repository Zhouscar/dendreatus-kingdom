import Roact from "@rbxts/roact";
import { useSelector } from "@rbxts/roact-reflex";
import { defaultPlayerInventory, selectPlayerInventory } from "shared/store/players/inventory";
import ItemSlot from "./itemSlot";
import immutPutItems from "shared/features/inventory/functions/immutSetters/immutPutItems";
import { localPlr } from "client/localPlr";
import { Dispatch, SetStateAction } from "@rbxts/roact-hooked";
import { createGuidPool } from "shared/features/guidUtils";

const testInventory = immutPutItems(defaultPlayerInventory, "stick", 500, createGuidPool());

export default function ItemFragments(props: {
    enabled: boolean;
    from: number;
    to: number;
    indexCurrentlyHovered: number | undefined;
    setIndexCurrentlyHovered: Dispatch<SetStateAction<number | undefined>>;
    swapItems: (from: number, to: number) => void;
}) {
    const enabled = props.enabled;
    const from = props.from;
    const to = props.to;

    const indexCurrentlyHovered = props.indexCurrentlyHovered;
    const setIndexCurrentlyHovered = props.setIndexCurrentlyHovered;
    const swapItems = props.swapItems;

    // from (inclusive)
    // to (exclusive)

    const inventory = useSelector(selectPlayerInventory(localPlr));

    // // const inventory = testInventory;

    const items: Roact.Element[] = [];

    if (inventory !== undefined) {
        for (let i = from; i < to; i++) {
            const guid = inventory.slots[i].itemGuid;
            const item = guid !== undefined ? inventory.items.get(guid) : undefined;

            items.push(
                <ItemSlot
                    enabled={enabled}
                    item={item}
                    indexCurrentlyHovered={indexCurrentlyHovered}
                    setIndexCurrentlyHovered={setIndexCurrentlyHovered}
                    index={i}
                    swapItems={swapItems}
                ></ItemSlot>,
            );
        }
    }

    return <>{items}</>;
}
