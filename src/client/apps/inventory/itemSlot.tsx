import { Spring, useDeferEffect } from "@rbxts/pretty-roact-hooks";
import Roact, { createRef } from "@rbxts/roact";
import {
    Dispatch,
    SetStateAction,
    useBinding,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "@rbxts/roact-hooked";
import { Item } from "shared/features/items/types";
import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { GuiService, RunService, UserInputService } from "@rbxts/services";
import { ITEM_CONSUMABLE_CONTEXTS } from "shared/features/items/consumables";
import { useEnability, useEnabled } from "../hooks/enability";
import { useSpring } from "../hooks/ripple";

export default function ItemSlot(props: {
    index: number;
    item?: Item;
    indexCurrentlyHovered: number | undefined;
    setIndexCurrentlyHovered: Dispatch<SetStateAction<number | undefined>>;
    swapItems: (from: number, to: number) => void;
}) {
    const enabled = useEnabled();

    const item = props.item;
    const index = props.index;

    const consumeStagePerc = useMemo(() => {
        if (item?.itemType === undefined) return undefined;

        const context = ITEM_CONSUMABLE_CONTEXTS.get(item?.itemType);
        if (context === undefined) return undefined;

        if (item.consumeStage === undefined) return undefined;

        return 1 - (item.consumeStage + 1) / context.stageAnimationIds.size();
    }, [item, item?.itemType]);

    const consumeStagePercSpring = useSpring(consumeStagePerc ?? 1);

    const indexCurrentlyHovered = props.indexCurrentlyHovered;
    const setIndexCurrentlyHovered = props.setIndexCurrentlyHovered;
    const swapItems = props.swapItems;

    const image = item !== undefined ? ITEM_CONTEXTS.get(item.itemType)?.image : undefined;

    const enability = useEnability();
    const enabilityTransparency = enability.map((v) => 1 - v);
    const enabilitySemiTransparency = enability.map((v) => 1 - v * 0.5);
    const enabilityTinyTransparency = enability.map((v) => 1 - v * 0.8);

    const [hovering, setHovering] = useState(false);
    const hoverSpring = useSpring(hovering ? 1 : 0);
    const hoverTransparency = hoverSpring.map((v) => 1 - v);

    const [dragging, setDragging] = useState(false);
    const dragSpring = useSpring(dragging ? 1 : 0);

    const [draggerOffset, setDraggerOffset] = useBinding(new Vector2(0, 0));
    const [draggerPosition, setDraggerPosition] = useBinding(new UDim2(0, 0, 0, 0));

    const draggerSize = dragSpring.map((v) => new UDim2(0, 80 - v * 20, 0, 80 - v * 20));

    const itemImageRef = createRef<ImageLabel>();

    useEffect(() => {
        if (!enabled) {
            setHovering(false);
            setDragging(false);
        }
    }, [enabled]);

    useEffect(() => {
        if (dragging) {
            const connection = RunService.RenderStepped.Connect(() => {
                if (itemImageRef.getValue()) {
                    const mouseLocation = UserInputService.GetMouseLocation().sub(
                        new Vector2(0, GuiService.GetGuiInset()[0].Y),
                    );
                    const offset = draggerOffset.getValue();

                    setDraggerPosition(
                        new UDim2(0, offset.X + mouseLocation.X, 0, offset.Y + mouseLocation.Y),
                    );
                }
            });

            return () => {
                connection.Disconnect();
            };
        }
    }, [dragging, itemImageRef]);

    const onHover = useCallback(() => {
        setHovering(true);
    }, []);

    const onUnhover = useCallback(() => {
        setHovering(false);
    }, []);

    useDeferEffect(() => {
        setIndexCurrentlyHovered(hovering ? index : undefined);
    }, [hovering]);

    useEffect(() => {
        if (dragging) return;
        if (indexCurrentlyHovered === undefined) return;
        if (indexCurrentlyHovered === index) return;
        swapItems(index, indexCurrentlyHovered);
    }, [dragging]);

    const inputBegan = useCallback((_, input: InputObject) => {
        if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;
        // setDraggerOffset
        setDragging(true);
    }, []);

    const inputEnded = useCallback((_, input: InputObject) => {
        if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;
        setDragging(false);
    }, []);

    return (
        <frame
            Size={new UDim2(0, 80, 0, 80)}
            BackgroundTransparency={enabilitySemiTransparency}
            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            BorderSizePixel={0}
            Event={{
                MouseEnter: enabled ? onHover : undefined,
                MouseLeave: enabled ? onUnhover : undefined,
                InputBegan: enabled ? inputBegan : undefined,
                InputEnded: enabled ? inputEnded : undefined,
            }}
        >
            <frame
                ZIndex={2}
                Transparency={hoverTransparency}
                Size={new UDim2(1, 0, 1, 0)}
                BackgroundColor3={Color3.fromRGB(255, 255, 150)}
                BorderSizePixel={0}
            >
                <uigradient
                    Transparency={new NumberSequence(0, 1)}
                    Rotation={-90}
                    Offset={new Vector2(0, 0.3)}
                />
                <uistroke
                    Color={Color3.fromRGB(150, 150, 150)}
                    ApplyStrokeMode={"Border"}
                    LineJoinMode={"Miter"}
                    Transparency={enabilitySemiTransparency}
                    Thickness={2}
                />
            </frame>
            {item !== undefined && (
                <>
                    <imagelabel
                        Ref={itemImageRef}
                        Key={"Image"}
                        ZIndex={1}
                        Size={new UDim2(1, 0, 1, 0)}
                        Image={image}
                        BackgroundTransparency={1}
                        ImageTransparency={enabilityTransparency.map((v) => (dragging ? 1 : v))}
                    >
                        <textlabel
                            Position={new UDim2(1, -5, 1, -5)}
                            AnchorPoint={new Vector2(1, 1)}
                            BackgroundTransparency={1}
                            TextTransparency={enabilityTransparency.map((v) => (dragging ? 1 : v))}
                            TextColor3={Color3.fromRGB(255, 255, 255)}
                            TextXAlignment={"Right"}
                            TextYAlignment={"Bottom"}
                            TextSize={20}
                            Font={"Fantasy"}
                            Text={item.stack > 1 ? tostring(item.stack) : ""}
                        >
                            <uistroke
                                Thickness={2}
                                ApplyStrokeMode={"Contextual"}
                                Transparency={enabilityTransparency.map((v) => (dragging ? 1 : v))}
                            />
                        </textlabel>
                        {consumeStagePerc !== undefined && (
                            <frame
                                Position={new UDim2(0.5, 0, 1, -5)}
                                AnchorPoint={new Vector2(0.5, 1)}
                                Size={new UDim2(0.8, 0, 0, 15)}
                                BorderSizePixel={0}
                                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                                BackgroundTransparency={enabilityTinyTransparency}
                            >
                                <frame
                                    Size={consumeStagePercSpring.map(
                                        (v) => new UDim2(v, -4, 1, -4),
                                    )}
                                    AnchorPoint={new Vector2(0, 0.5)}
                                    Position={new UDim2(0, 2, 0.5, 0)}
                                    BorderSizePixel={0}
                                    BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                                    Transparency={enabilityTransparency}
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
                    {dragging && (
                        <screengui Key={"DraggerScreen"} ResetOnSpawn={false}>
                            <frame Transparency={1} Size={draggerSize} Position={draggerPosition}>
                                <imagelabel
                                    Key={"DraggerImage"}
                                    ZIndex={2}
                                    BackgroundTransparency={1}
                                    Size={new UDim2(1, 0, 1, 0)}
                                    AnchorPoint={new Vector2(0.5, 0.5)}
                                    Image={image}
                                >
                                    <textlabel
                                        Position={new UDim2(1, -5, 1, -5)}
                                        ZIndex={3}
                                        AnchorPoint={new Vector2(1, 1)}
                                        BackgroundTransparency={1}
                                        TextColor3={Color3.fromRGB(255, 255, 255)}
                                        TextXAlignment={"Right"}
                                        TextYAlignment={"Bottom"}
                                        TextSize={20}
                                        Font={"Fantasy"}
                                        Text={item.stack > 1 ? tostring(item.stack) : ""}
                                    >
                                        <uistroke
                                            Thickness={2}
                                            ApplyStrokeMode={"Contextual"}
                                        ></uistroke>
                                    </textlabel>
                                </imagelabel>
                            </frame>
                        </screengui>
                    )}
                </>
            )}
        </frame>
    );
}
