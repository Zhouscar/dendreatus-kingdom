import Roact from "@rbxts/roact";
import ItemAttackablesFragments from "./attackables/attackablesFragment";
import ItemConsumablesFragments from "./consumables/consumablesFragment";

export default function ItemActivationHandler(props: {}) {
    return (
        <>
            <ItemAttackablesFragments />
            <ItemConsumablesFragments />
        </>
    );
}
