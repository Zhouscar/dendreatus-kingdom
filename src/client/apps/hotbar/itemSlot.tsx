import { Spring, useMotor } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { Item } from "shared/features/items/types";
import useSwitchMotorEffect from "../hooks/useSwitchMotorEffect";
import { ITEM_CONSTANTS } from "shared/features/items/constants";
import { useEffect, useMemo } from "@rbxts/roact-hooked";
import { ITEM_CONSUMABLE_CONTEXT } from "shared/features/items/consumables";
import useEnabled from "../hooks/useEnabled";

export default function ItemSlot(props: { item: Item | undefined; equipped: boolean }) {
    const enabled = useEnabled();
    const equipped = props.equipped;
    const item = props.item;

    const consumeStagePerc = useMemo(() => {
        if (item?.itemType === undefined) return undefined;

        const context = ITEM_CONSUMABLE_CONTEXT.get(item?.itemType);
        if (context === undefined) return undefined;

        if (item.consumeStage === undefined) return undefined;

        return 1 - (item.consumeStage + 1) / context.stageAnimationIds.size();
    }, [item, item?.itemType]);
    const [consumeStagePercMotor, setConsumeStagePercMotor] = useMotor(1);

    useEffect(() => {
        if (consumeStagePerc !== undefined) {
            setConsumeStagePercMotor(new Spring(consumeStagePerc));
        }
    }, [consumeStagePerc]);

    const image = item !== undefined ? ITEM_CONSTANTS.get(item.itemType)?.image : undefined;

    const [enabilityMotor, setEnabilityMotor] = useMotor(0);
    const enabilitySemiTransparency = enabilityMotor.map((v) => 1 - v * 0.3);
    const enabilityTinyTransparency = enabilityMotor.map((v) => 1 - v * 0.8);
    const enabilityTransparency = enabilityMotor.map((v) => 1 - v);

    const [equippedMotor, setEquippedMotor] = useMotor(0);
    const equippedTransparency = equippedMotor.map((v) => 1 - v);

    useSwitchMotorEffect(equipped, setEquippedMotor);
    useSwitchMotorEffect(enabled, setEnabilityMotor);

    useEffect(() => {
        if (!enabled) setEquippedMotor(new Spring(0));
        else if (equipped) {
            setEquippedMotor(new Spring(1));
        }
    }, [enabled]);

    return (
        <frame
            Size={new UDim2(0, 80, 0, 80)}
            ZIndex={1}
            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            BackgroundTransparency={enabilitySemiTransparency}
            BorderSizePixel={0}
        >
            <uistroke
                Thickness={5}
                Color={Color3.fromRGB(255, 255, 150)}
                ApplyStrokeMode={"Border"}
                Transparency={equippedTransparency}
            ></uistroke>
            {item !== undefined && (
                <imagelabel
                    Size={new UDim2(1, 0, 1, 0)}
                    BackgroundTransparency={1}
                    Image={image}
                    ImageTransparency={enabilityTransparency}
                >
                    <textlabel
                        Position={new UDim2(1, -5, 1, -5)}
                        AnchorPoint={new Vector2(1, 1)}
                        BackgroundTransparency={1}
                        TextTransparency={enabilityTransparency}
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
                            Transparency={enabilityTransparency}
                        ></uistroke>
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
                                Size={consumeStagePercMotor.map((v) => new UDim2(v, -4, 1, -4))}
                                AnchorPoint={new Vector2(0, 0.5)}
                                Position={new UDim2(0, 2, 0.5, 0)}
                                BorderSizePixel={0}
                                BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                                Transparency={enabilityTransparency}
                            >
                                <uigradient
                                    Color={consumeStagePercMotor.map(
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
        </frame>
    );
}
