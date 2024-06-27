import { World } from "@rbxts/matter";
import { WProvider } from "./contexts/world";
import Roact from "@rbxts/roact";
import { ReflexProvider } from "@rbxts/roact-reflex";
import { store } from "client/store";
import Inventory from "./inventory";
import Hotbar from "./hotbar";
import HealthBar from "./healthBar";
import HungerBar from "./hungerBar";
import Interactables from "./interactables";
import { RemoteTokenProvider } from "./contexts/remoteToken";
import DeathScreen from "./deathScreen";
import ClockTimeHandler from "./clockTimeHandler";
import TitleCard from "./titleCard";
import { ClientState, State } from "shared/state";
import SpawningHandler from "./spawningHandler";
import { useClientState } from "./hooks/ecsSelectors";

function App() {
    const clientState = useClientState();

    return (
        <>
            <ClockTimeHandler />
            <screengui Key={"Root"} ResetOnSpawn={false}>
                <SpawningHandler enabled={clientState === "spawning"} />
                <TitleCard enabled={clientState === "title"} />
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
                <DeathScreen enabled={clientState === "death"} />
            </screengui>
        </>
    );
}

export default function Root(props: {
    w: World;
    setClientState: (state: ClientState) => void;
    remoteToken: string;
}) {
    return (
        <WProvider value={{ w: props.w, setClientState: props.setClientState }}>
            <RemoteTokenProvider value={{ remoteToken: props.remoteToken }}>
                <ReflexProvider producer={store}>
                    <App />
                </ReflexProvider>
            </RemoteTokenProvider>
        </WProvider>
    );
}
