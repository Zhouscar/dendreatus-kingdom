import { Spring, useMotor } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { Item } from "shared/features/items/types";
import useSwitchMotorEffect from "../hooks/useSwitchMotorEffect";
import { ITEM_CONSTANTS } from "shared/features/items/constants";
import { useEffect } from "@rbxts/roact-hooked";

export default function ItemSlot(props: {
    enabled: boolean;
    item: Item | undefined;
    equipped: boolean;
}) {
    const equipped = props.equipped;
    const enabled = props.enabled;
    const item = props.item;

    const image = item !== undefined ? ITEM_CONSTANTS.get(item.itemType)?.image : undefined;

    const [enabilityMotor, setEnabilityMotor] = useMotor(0);
    const enabilitySemiTransparency = enabilityMotor.map((v) => 1 - v * 0.3);
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
                </imagelabel>
            )}
        </frame>
    );
}
