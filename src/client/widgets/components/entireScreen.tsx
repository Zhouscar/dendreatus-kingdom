import Roact from "@rbxts/roact";
import { GuiService } from "@rbxts/services";

function EntireScreen(props: Roact.PropsWithChildren & { handleInset?: boolean }) {
    const handleInset = props.handleInset === true;

    return (
        <frame
            Key={"EntireScreen"}
            Position={new UDim2(0, 0, 0, handleInset ? -GuiService.GetGuiInset()[0].Y : 0)}
            Size={new UDim2(1, 0, 1, handleInset ? GuiService.GetGuiInset()[0].Y : 0)}
            Transparency={1}
            BorderSizePixel={0}
            ClipsDescendants={false}
        >
            {props[Roact.Children]}
        </frame>
    );
}

export = EntireScreen;
