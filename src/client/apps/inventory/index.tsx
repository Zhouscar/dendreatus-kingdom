import Roact from "@rbxts/roact";
import { useProducer, useSelector } from "@rbxts/roact-reflex";
import Transition from "../components/transition";
import { theLocalPlr } from "client/localPlr";
import { useBinding, useCallback, useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import { defaultPlayerInventory, selectPlayerInventory } from "shared/store/players/inventory";
import ItemFragments from "./itemFragments";
import { immutPutItems } from "shared/features/inventory/functions";
import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { RootProducer } from "client/store";
import { createGuidPool } from "shared/features/guidUtils";
import { remos } from "shared/network";
import { useSpring } from "../hooks/ripple";

let testInventory = defaultPlayerInventory;
testInventory = immutPutItems(defaultPlayerInventory, "stick", 500, createGuidPool());
testInventory = immutPutItems(testInventory, "bigger_stick", 50, createGuidPool());

const SLOT_LEN = 80;
const SLOT_PAD = 10;

function getLengthBySlots(count: number) {
    return (SLOT_LEN + SLOT_PAD) * count + SLOT_PAD;
}

export default function Inventory(props: { enabled: boolean }) {
    const enabled = props.enabled;

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

    const itemDescriptionShowingSpring = useSpring(itemCurrentlyHovered !== undefined ? 1 : 0);
    const itemDescriptionTransparency = itemDescriptionShowingSpring.map((v) => 1 - v);

    const [itemName, setItemName] = useBinding("");
    const [itemDescription, setItemDescription] = useBinding("");

    useEffect(() => {
        if (itemCurrentlyHovered === undefined) return;

        const itemConstant = ITEM_CONTEXTS.get(itemCurrentlyHovered.itemType);
        if (itemConstant === undefined) return;

        setItemName(itemConstant.name);
        setItemDescription(itemConstant.description);
    }, [itemCurrentlyHovered]);

    const swapItems = useCallback((from: number, to: number) => {
        remos.store.swapItems.fire(from, to);
    }, []);

    return (
        <Transition enabled={enabled}>
            <frame
                Key={"Background"}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                BackgroundTransparency={0.3}
                Size={new UDim2(1, 0, 1, 0)}
            />
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
                    BackgroundTransparency={0.3}
                    ClipsDescendants={true}
                >
                    <uigridlayout
                        VerticalAlignment={"Center"}
                        HorizontalAlignment={"Center"}
                        CellSize={new UDim2(0, SLOT_LEN, 0, SLOT_LEN)}
                        CellPadding={new UDim2(0, SLOT_PAD, 0, SLOT_PAD)}
                        SortOrder={"LayoutOrder"}
                    />
                    <ItemFragments
                        from={10}
                        to={30}
                        indexCurrentlyHovered={indexCurrentlyHovered}
                        setIndexCurrentlyHovered={setIndexCurrentlyHovered}
                        swapItems={swapItems}
                    />
                </frame>
                <frame
                    Key={"Description"}
                    Size={new UDim2(0.3, 0, 0.9, 0)}
                    AnchorPoint={new Vector2(0, 0.5)}
                    Position={new UDim2(0, 30, 0.5, 0)}
                    BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                    ClipsDescendants={true}
                    Transparency={0.3}
                >
                    <uilistlayout SortOrder={"LayoutOrder"} FillDirection={"Vertical"} />
                    <textlabel
                        Key={"ItemName"}
                        LayoutOrder={1}
                        AnchorPoint={new Vector2(0.5, 0)}
                        BackgroundTransparency={1}
                        TextColor3={Color3.fromRGB(255, 255, 255)}
                        TextXAlignment={"Center"}
                        TextYAlignment={"Top"}
                        TextSize={50}
                        Size={new UDim2(1, 0, 0, 0)}
                        AutomaticSize={"Y"}
                        Font={"Fantasy"}
                        Text={itemName}
                        TextTransparency={itemDescriptionTransparency}
                    >
                        <uistroke
                            Thickness={2}
                            ApplyStrokeMode={"Contextual"}
                            Transparency={itemDescriptionTransparency}
                        />
                    </textlabel>
                    <textlabel
                        Key={"ItemDescription"}
                        LayoutOrder={2}
                        AnchorPoint={new Vector2(0.5, 0)}
                        Size={new UDim2(1, 0, 0, 0)}
                        AutomaticSize={"Y"}
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
                        />
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
                    BackgroundTransparency={0.3}
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
                    />
                </frame>
            </frame>
        </Transition>
    );
}
