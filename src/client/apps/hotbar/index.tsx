import Roact from "@rbxts/roact";
import ItemFragments from "./itemFragments";
import useSuperSize from "../hooks/useSuperPosition";
import useComponent from "../hooks/useComponent";
import { EquippingByIndex } from "shared/components/items";
import { useSelector } from "@rbxts/roact-reflex";
import { selectLocalPlrE } from "client/store/ecs";
import useLocalPlrE from "../hooks/useLocalPlrE";

const SLOT_LEN = 50;
const SLOT_PAD = 5;

function getLengthBySlots(count: number) {
    return (SLOT_LEN + SLOT_PAD) * count + SLOT_PAD;
}

export default function Hotbar(props: {}) {
    const localPlrE = useLocalPlrE();

    const equippingByIndex = useComponent(localPlrE, EquippingByIndex);
    const indexEquipped = equippingByIndex?.index;

    return (
        <frame
            Key={"Hotbar"}
            AnchorPoint={new Vector2(0.5, 1)}
            Position={new UDim2(0.5, 0, 1, -10)}
            Size={new UDim2(0, getLengthBySlots(10), 0, getLengthBySlots(1))}
            Transparency={1}
        >
            <uigridlayout
                VerticalAlignment={"Center"}
                HorizontalAlignment={"Center"}
                CellSize={new UDim2(0, SLOT_LEN, 0, SLOT_LEN)}
                CellPadding={new UDim2(0, SLOT_PAD, 0, SLOT_PAD)}
                SortOrder={"LayoutOrder"}
            ></uigridlayout>
            <ItemFragments indexEquipped={indexEquipped} from={0} to={10}></ItemFragments>
        </frame>
    );
}
