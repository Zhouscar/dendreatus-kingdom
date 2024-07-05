import Roact from "@rbxts/roact";
import { Cookable, Craftable } from "shared/components/interactables";
import CraftableItemSlot from "./itemSlot";

export default function CraftableItemFragments(props: { showing: boolean; craftable: Craftable }) {
    const showing = props.showing;
    const craftable = props.craftable;

    const elements: Roact.Element[] = [];

    for (let i = 0; i < 3; i++) {
        const item = craftable.items[i].item;
        elements.push(<CraftableItemSlot item={item} showing={showing} />);
    }

    return <>{elements}</>;
}
