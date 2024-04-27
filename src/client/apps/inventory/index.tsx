import Roact from "@rbxts/roact";
import { ReflexProvider, useProducer, useSelector } from "@rbxts/roact-reflex";
import EntireScreen from "../components/entireScreen";
import { theLocalPlr } from "client/localPlr";
import { Spring, useMotor } from "@rbxts/pretty-roact-hooks";
import { useBinding, useCallback, useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import { defaultPlayerInventory, selectPlayerInventory } from "shared/store/players/inventory";
import ItemFragments from "./itemFragments";
import { immutPutItems } from "shared/features/inventory/functions";
import useSwitchMotorEffect from "../hooks/useSwitchMotorEffect";
import { ITEM_CONSTANTS } from "shared/features/items/constants";
import { RootProducer, store } from "client/store";
import { createGuidPool } from "shared/features/guidUtils";
import { remos, routes } from "shared/network";
import { EnabilityProvider } from "../contexts/enability";
import useEnabled from "../hooks/useEnabled";

let testInventory = defaultPlayerInventory;
testInventory = immutPutItems(defaultPlayerInventory, "stick", 500, createGuidPool());
testInventory = immutPutItems(testInventory, "bigger_stick", 50, createGuidPool());

const SLOT_LEN = 80;
const SLOT_PAD = 10;

function getLengthBySlots(count: number) {
    return (SLOT_LEN + SLOT_PAD) * count + SLOT_PAD;
}

function App(props: {}) {
    const enabled = useEnabled();

    const [enabilityMotor, setEnabilityMotor] = useMotor(0);
    const enabilityTransparency = enabilityMotor.map((v) => 1 - v);
    const enabilitySemiTransparency = enabilityMotor.map((v) => 1 - v * 0.3);

    const store = useProducer<RootProducer>();
    const inventory = useSelector(selectPlayerInventory(theLocalPlr));

    // // const inventory: PlayerInventory | undefined = testInventory;

    const [indexCurrentlyHovered, setIndexCurrentlyHovered] = useState<undefined | number>(
        undefined,
    );
    const itemCurrentlyHovered = useMemo(() => {
        if (inventory === undefined) return undefined;
        if (indexCurrentlyHovered === undefined) return undefined;
        const itemGuid = inventory.slots[indexCurrentlyHovered].itemGuid;
        if (itemGuid === undefined) return undefined;
        return inventory.items.get(itemGuid);
    }, [indexCurrentlyHovered, inventory]);

    const [itemDescriptionShowingMotor, setItemDescriptionShowingMotor] = useMotor(0);
    const itemDescriptionTransparency = itemDescriptionShowingMotor.map((v) => 1 - v);

    const [itemName, setItemName] = useBinding("");
    const [itemDescription, setItemDescription] = useBinding("");

    useEffect(() => {
        if (itemCurrentlyHovered === undefined) return;
        const itemConstant = ITEM_CONSTANTS.get(itemCurrentlyHovered.itemType);
        if (itemConstant === undefined) return;

        setItemName(itemConstant.name);
        setItemDescription(itemConstant.description);
    }, [itemCurrentlyHovered]);

    useSwitchMotorEffect(itemCurrentlyHovered !== undefined, setItemDescriptionShowingMotor);

    const swapItems = useCallback((from: number, to: number) => {
        remos.store.swapItems.fire(from, to);
    }, []);

    useEffect(() => {
        setEnabilityMotor(new Spring(enabled ? 1 : 0));
    }, [enabled]);

    return (
        <EntireScreen superPositionEnabilityMotor={enabilityMotor} Key={"Inventory"}>
            <EntireScreen handleInset={true}>
                <frame
                    Key={"Background"}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                    BackgroundTransparency={enabilitySemiTransparency}
                    Size={new UDim2(1, 0, 1, 0)}
                ></frame>
            </EntireScreen>
            <frame
                Key={"Main"}
                Size={new UDim2(1, -30, 1, -30 - 120)}
                AnchorPoint={new Vector2(0.5, 0)}
                Position={new UDim2(0.5, 0, 0, 30)}
                Transparency={1}
            >
                <frame
                    Key={"BagPack"}
                    Size={new UDim2(0, getLengthBySlots(4), 0, getLengthBySlots(5))}
                    AnchorPoint={new Vector2(1, 0.5)}
                    Position={new UDim2(1, -30, 0.5, 0)}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                    BackgroundTransparency={enabilitySemiTransparency}
                    ClipsDescendants={true}
                >
                    <uigridlayout
                        VerticalAlignment={"Center"}
                        HorizontalAlignment={"Center"}
                        CellSize={new UDim2(0, SLOT_LEN, 0, SLOT_LEN)}
                        CellPadding={new UDim2(0, SLOT_PAD, 0, SLOT_PAD)}
                        SortOrder={"LayoutOrder"}
                    ></uigridlayout>
                    <ItemFragments
                        from={10}
                        to={30}
                        indexCurrentlyHovered={indexCurrentlyHovered}
                        setIndexCurrentlyHovered={setIndexCurrentlyHovered}
                        swapItems={swapItems}
                    ></ItemFragments>
                </frame>
                <frame
                    Key={"Description"}
                    Size={new UDim2(0.3, 0, 0.9, 0)}
                    AnchorPoint={new Vector2(0, 0.5)}
                    Position={new UDim2(0, 30, 0.5, 0)}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                    ClipsDescendants={true}
                    Transparency={enabilitySemiTransparency}
                >
                    <textlabel
                        Key={"ItemName"}
                        AnchorPoint={new Vector2(0.5, 0)}
                        Position={new UDim2(0.5, 0, 0, 20)}
                        BackgroundTransparency={1}
                        TextColor3={Color3.fromRGB(255, 255, 255)}
                        TextXAlignment={"Center"}
                        TextYAlignment={"Top"}
                        TextSize={50}
                        Font={"Fantasy"}
                        Text={itemName}
                        TextTransparency={itemDescriptionTransparency}
                    >
                        <uistroke
                            Thickness={2}
                            ApplyStrokeMode={"Contextual"}
                            Transparency={itemDescriptionTransparency}
                        ></uistroke>
                    </textlabel>
                    <textlabel
                        Key={"ItemDescription"}
                        AnchorPoint={new Vector2(0.5, 0)}
                        Position={new UDim2(0.5, 0, 0, 100)}
                        Size={new UDim2(1, -50, 1, 0)}
                        BackgroundTransparency={1}
                        TextColor3={Color3.fromRGB(255, 255, 255)}
                        TextXAlignment={"Center"}
                        TextYAlignment={"Top"}
                        TextSize={20}
                        Font={"Fantasy"}
                        Text={itemDescription}
                        TextTransparency={itemDescriptionTransparency}
                        TextWrapped={true}
                    >
                        <uistroke
                            Thickness={1}
                            ApplyStrokeMode={"Contextual"}
                            Transparency={itemDescriptionTransparency}
                        ></uistroke>
                    </textlabel>
                </frame>
            </frame>
            <frame
                Key={"Bottom"}
                Size={new UDim2(1, -30, 0, 120)}
                BackgroundTransparency={1}
                Position={new UDim2(0.5, 0, 1, -30)}
                AnchorPoint={new Vector2(0.5, 1)}
            >
                <frame
                    Key={"Hotbar"}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    BackgroundTransparency={enabilitySemiTransparency}
                    ClipsDescendants={true}
                    Size={new UDim2(0, getLengthBySlots(10), 0, getLengthBySlots(1))}
                >
                    <uigridlayout
                        VerticalAlignment={"Center"}
                        HorizontalAlignment={"Center"}
                        CellSize={new UDim2(0, SLOT_LEN, 0, SLOT_LEN)}
                        CellPadding={new UDim2(0, SLOT_PAD, 0, SLOT_PAD)}
                        SortOrder={"LayoutOrder"}
                    ></uigridlayout>
                    <ItemFragments
                        from={0}
                        to={10}
                        indexCurrentlyHovered={indexCurrentlyHovered}
                        setIndexCurrentlyHovered={setIndexCurrentlyHovered}
                        swapItems={swapItems}
                    ></ItemFragments>
                </frame>
            </frame>
        </EntireScreen>
    );
}

export default function Inventory(props: { enabled: boolean }) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App />
        </EnabilityProvider>
    );
}
