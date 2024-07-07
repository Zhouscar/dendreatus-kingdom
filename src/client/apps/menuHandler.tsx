import Roact from "@rbxts/roact";
import useMenuOpened from "./hooks/useMenuOpened";
import Transition from "./components/transition";
import Blur from "./components/blur";

export default function MenuHandler() {
    const menuOpened = useMenuOpened();

    return (
        <Transition enabled={menuOpened} zindex={100}>
            <Blur size={menuOpened ? 10 : 0} />
        </Transition>
    );
}
