import { World } from "@rbxts/matter";
import { WProvider } from "./contexts/world";
import Roact from "@rbxts/roact";
import { ReflexProvider } from "@rbxts/roact-reflex";
import { store } from "client/store";
import Inventory from "./inventory";
import Hotbar from "./hotbar";
import HealthBar from "./healthBar";
import HungerBar from "./hungerBar";
import { useClientState } from "./hooks/ecsSelectors";
import Interactables from "./interactables";

function App() {
    const clientState = useClientState();

    return (
        <>
            <screengui Key={"Root"} ResetOnSpawn={false}>
                <Inventory enabled={clientState === "inventory"} />
                <Hotbar enabled={clientState === "game"} />
                <HealthBar
                    enabled={clientState === "game"}
                    Size={new UDim2(0.5, 0, 0, 20)}
                    Position={new UDim2(0.5, 0, 1, -150)}
                    AnchorPoint={new Vector2(0.5, 0)}
                />
                <HungerBar
                    enabled={clientState === "game"}
                    Size={new UDim2(0.5, 0, 0, 20)}
                    Position={new UDim2(0.5, 0, 1, -130)}
                    AnchorPoint={new Vector2(0.5, 0)}
                />
                <Interactables enabled={clientState === "game"} />
            </screengui>
        </>
    );
}

export default function Root(props: { w: World }) {
    const w = props.w;
    const wProviderValue = { w };

    return (
        <WProvider value={wProviderValue}>
            <ReflexProvider producer={store}>
                <App></App>
            </ReflexProvider>
        </WProvider>
    );
}
