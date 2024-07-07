import { useEventListener } from "@rbxts/pretty-roact-hooks";
import { useState } from "@rbxts/roact-hooked";
import { GuiService } from "@rbxts/services";

export default function useMenuOpened() {
    const [menuOpened, setMenuOpened] = useState(GuiService.MenuIsOpen);

    useEventListener(GuiService.MenuOpened, () => {
        setMenuOpened(true);
    });

    useEventListener(GuiService.MenuClosed, () => {
        setMenuOpened(false);
    });

    return menuOpened;
}
