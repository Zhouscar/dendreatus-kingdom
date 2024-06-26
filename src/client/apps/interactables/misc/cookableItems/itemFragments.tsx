import Roact from "@rbxts/roact";
import { Cookable } from "shared/components/interactables";
import CookableItemSlot from "./itemSlot";

// TODO: item fragments for the cooking item bar

export default function CookableItemFragments(props: { showing: boolean; cookable: Cookable }) {
    const showing = props.showing;
    const cookable = props.cookable;

    const elements: Roact.Element[] = [];

    for (let i = 0; i < 3; i++) {
        const item = cookable.items[i].item;
        elements.push(<CookableItemSlot item={item} showing={showing} />);
    }

    return <>{elements}</>;
}
