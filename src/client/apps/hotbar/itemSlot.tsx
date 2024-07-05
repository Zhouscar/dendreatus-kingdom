import Roact from "@rbxts/roact";
import { Item } from "shared/features/items/types";
import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { useCallback, useMemo } from "@rbxts/roact-hooked";
import { ITEM_CONSUMABLE_CONTEXTS } from "shared/features/items/consumables";
import { useSpring } from "../hooks/ripple";
import useW from "../hooks/useW";
import { EquippingByIndex } from "shared/components/items";
import useLocalPlrE from "../hooks/useLocalPlrE";

export default function ItemSlot(props: {
    indexEquipped: number | undefined;
    index: number;
    item: Item | undefined;
}) {
    const item = props.item;
    const index = props.index;
    const indexEquipped = props.indexEquipped;

    const equipped = index === indexEquipped;

    const localPlrE = useLocalPlrE();
    const w = useW();

    const clicked = useCallback(() => {
        if (!w.contains(localPlrE)) return;

        if (equipped) {
            w.remove(localPlrE, EquippingByIndex);
        } else {
            w.insert(localPlrE, EquippingByIndex({ index: index }));
        }
    }, [w, indexEquipped, localPlrE, index]);

    const consumeStagePerc = useMemo(() => {
        if (item?.itemType === undefined) return undefined;

        const context = ITEM_CONSUMABLE_CONTEXTS.get(item?.itemType);
        if (context === undefined) return undefined;

        if (item.consumeStage === undefined) return undefined;

        return 1 - (item.consumeStage + 1) / context.stageAnimationIds.size();
    }, [item, item?.itemType]);

    const consumeStagePercSpring = useSpring(consumeStagePerc ?? 1);

    const image = item !== undefined ? ITEM_CONTEXTS.get(item.itemType)?.image : undefined;

    const equippedTransparency = useSpring(equipped ? 0 : 1);

    return (
        <textbutton
            AutoButtonColor={false}
            Size={new UDim2(0, 50, 0, 50)}
            ZIndex={1}
            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            BackgroundTransparency={0.5}
            BorderSizePixel={0}
            Event={{ MouseButton1Click: clicked }}
            Text={""}
        >
            <uistroke
                Thickness={5}
                Color={Color3.fromRGB(255, 255, 150)}
                ApplyStrokeMode={"Border"}
                Transparency={equippedTransparency}
            />
            {item !== undefined && (
                <imagelabel Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1} Image={image}>
                    <textlabel
                        Position={new UDim2(1, -5, 1, -5)}
                        AnchorPoint={new Vector2(1, 1)}
                        BackgroundTransparency={1}
                        TextColor3={Color3.fromRGB(255, 255, 255)}
                        TextXAlignment={"Right"}
                        TextYAlignment={"Bottom"}
                        TextSize={20}
                        Font={"Fantasy"}
                        Text={item.stack > 1 ? tostring(item.stack) : ""}
                    >
                        <uistroke Thickness={2} ApplyStrokeMode={"Contextual"}></uistroke>
                    </textlabel>
                    {consumeStagePerc !== undefined && (
                        <frame
                            Position={new UDim2(0.5, 0, 1, -5)}
                            AnchorPoint={new Vector2(0.5, 1)}
                            Size={new UDim2(0.8, 0, 0, 15)}
                            BorderSizePixel={0}
                            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                            BackgroundTransparency={0.2}
                        >
                            <frame
                                Size={consumeStagePercSpring.map((v) => new UDim2(v, -4, 1, -4))}
                                AnchorPoint={new Vector2(0, 0.5)}
                                Position={new UDim2(0, 2, 0.5, 0)}
                                BorderSizePixel={0}
                                BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                            >
                                <uigradient
                                    Color={consumeStagePercSpring.map(
                                        (v) =>
                                            new ColorSequence(
                                                new Color3(1 - v, v, 0),

                                                Color3.fromRGB(0, 0, 0),
                                            ),
                                    )}
                                    Rotation={90}
                                    Offset={new Vector2(0, 0)}
                                ></uigradient>
                            </frame>
                        </frame>
                    )}
                </imagelabel>
            )}
        </textbutton>
    );
}
