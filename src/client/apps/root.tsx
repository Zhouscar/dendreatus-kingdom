import { World } from "@rbxts/matter";
import { WProvider } from "./contexts/world";
import Roact from "@rbxts/roact";
import { ReflexProvider } from "@rbxts/roact-reflex";
import { store } from "client/store";
import useClientState from "./hooks/useClientState";
import Inventory from "./inventory";
import Hotbar from "./hotbar";
import HealthBar from "./healthBar";
import HungerBar from "./hungerBar";

function App() {
    const clientState = useClientState();

    return (
        <screengui Key={"Root"} ResetOnSpawn={false}>
            <Inventory enabled={clientState === "inventory"}></Inventory>
            <Hotbar enabled={clientState === "game"}></Hotbar>
            <HealthBar
                enabled={clientState === "game"}
                Size={new UDim2(0.5, 0, 0, 20)}
                Position={new UDim2(0.5, 0, 1, -150)}
                AnchorPoint={new Vector2(0.5, 0)}
            ></HealthBar>
            <HungerBar
                enabled={clientState === "game"}
                Size={new UDim2(0.5, 0, 0, 20)}
                Position={new UDim2(0.5, 0, 1, -130)}
                AnchorPoint={new Vector2(0.5, 0)}
            ></HungerBar>
        </screengui>
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
