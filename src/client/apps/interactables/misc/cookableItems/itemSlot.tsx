// TODO: item slot for cooking item bar

import Roact from "@rbxts/roact";
import { useMemo } from "@rbxts/roact-hooked";
import { useSpring } from "client/apps/hooks/ripple";
import { ITEM_CONTEXTS } from "shared/features/items/constants";
import { Item } from "shared/features/items/types";

const SLOT_LEN = 80;
const SLOT_PAD = 10;

export default function CookableItemSlot(props: { item: Item | undefined; showing: boolean }) {
    const item = props.item;
    const showing = props.showing;

    const semiTrasnparency = useSpring(showing ? 0.5 : 1);
    const transparency = useSpring(showing ? 0 : 1);

    const itemContext = useMemo(() => {
        if (item === undefined) return undefined;
        return ITEM_CONTEXTS.get(item.itemType);
    }, [item]);

    const image = itemContext?.image;

    return (
        <frame
            Size={new UDim2(0, 80, 0, 80)}
            ZIndex={1}
            BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            BackgroundTransparency={semiTrasnparency}
            BorderSizePixel={0}
        >
            {item !== undefined && (
                <imagelabel
                    Size={new UDim2(1, 0, 1, 0)}
                    BackgroundTransparency={1}
                    Image={image}
                    ImageTransparency={transparency}
                />
            )}
        </frame>
    );
}
