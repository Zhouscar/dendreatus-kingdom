import Roact from "@rbxts/roact";
import { Item } from "shared/features/items/types";

export default function ItemSlot(props: {
    enabled: boolean;
    item: Item | undefined;
    equipped: boolean;
}) {
    return <frame Size={new UDim2(0, 80, 0, 80)}></frame>;
}
