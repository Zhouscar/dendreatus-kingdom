import Roact from "@rbxts/roact";
import useMenuOpened from "./hooks/useMenuOpened";
import Transition from "./components/transition";

export default function MenuHandler() {
    const menuOpened = useMenuOpened();

    return (
        <Transition enabled={menuOpened} zindex={100}>
            <frame
                Position={new UDim2(0.5, 0, 0.5, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Size={new UDim2(5, 0, 5, 0)}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
            />
        </Transition>
    );
}
