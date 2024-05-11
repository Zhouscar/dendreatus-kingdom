import Roact from "@rbxts/roact";
import { GuiService } from "@rbxts/services";
import useSuperPosition from "../hooks/useSuperPosition";
import { useMemo } from "@rbxts/roact-hooked";

export default function EntireScreen(
    props: Roact.PropsWithChildren & {
        handleInset?: boolean;
        superPositionEnability?: Roact.Binding<number>;
        Key?: string;
    },
) {
    const handleInset = props.handleInset === true;
    const superPositionEnability = props.superPositionEnability;

    const position = useMemo(() => {
        return new UDim2(0, 0, 0, handleInset ? -GuiService.GetGuiInset()[0].Y : 0);
    }, [handleInset]);

    const superPosition = useMemo(() => {
        if (superPositionEnability === undefined) return position;
        else return useSuperPosition(superPositionEnability, position);
    }, [superPositionEnability, position]);

    return (
        <frame
            Key={props.Key !== undefined ? props.Key : "EntireScreen"}
            Position={superPosition}
            Size={new UDim2(1, 0, 1, handleInset ? GuiService.GetGuiInset()[0].Y : 0)}
            Transparency={1}
            BorderSizePixel={0}
            ClipsDescendants={false}
        >
            {props[Roact.Children]}
        </frame>
    );
}
