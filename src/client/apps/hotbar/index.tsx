import Roact from "@rbxts/roact";
import ItemFragments from "./itemFragments";
import useSuperPosition from "../hooks/useSuperPosition";
import useComponent from "../hooks/useComponent";
import { EquippingByIndex } from "shared/components/items";
import { useLocalPlrE } from "../hooks/ecsSelectors";
import { EnabilityProvider } from "../contexts/enability";
import { useEnability } from "../hooks/enability";

const SLOT_LEN = 50;
const SLOT_PAD = 5;

function getLengthBySlots(count: number) {
    return (SLOT_LEN + SLOT_PAD) * count + SLOT_PAD;
}

function App(props: {}) {
    const localPlrE = useLocalPlrE();

    const equippingByIndex = useComponent(localPlrE, EquippingByIndex);
    const indexEquipped = equippingByIndex?.index;

    const enability = useEnability();

    const superPosition = useSuperPosition(
        enability,
        new UDim2(0, getLengthBySlots(10), 0, getLengthBySlots(1)),
    );

    return (
        <frame
            Key={"Hotbar"}
            AnchorPoint={new Vector2(0.5, 1)}
            Position={new UDim2(0.5, 0, 1, -10)}
            Size={superPosition}
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

export default function Hotbar(props: { enabled: boolean }) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App />
        </EnabilityProvider>
    );
}
