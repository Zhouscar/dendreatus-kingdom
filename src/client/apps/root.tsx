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
import { useClientState, useLocalPlrE } from "./hooks/ecsSelectors";
import ProximityPlrs from "./proximityPlrs";
import ChatScreen from "./chatScreen";
import MouseClickEffects from "./mouseClickSound";
import GameScreen from "./gameScreen";

function App() {
    const clientState = useClientState();
    const localPlrE = useLocalPlrE();

    return (
        <>
            <ClockTimeHandler />
            <screengui Key={"Root"} ResetOnSpawn={false}>
                <MouseClickEffects />
                <SpawningHandler enabled={clientState === "spawning"} />
                <TitleCard enabled={clientState === "title"} />
                <Inventory enabled={clientState === "inventory"} />
                <GameScreen enabled={clientState === "game"} />
                <Interactables enabled={clientState === "game"} />
                <ProximityPlrs enabled={clientState === "game" || clientState === "chat"} />
                <DeathScreen enabled={clientState === "death"} />
                <ChatScreen enabled={clientState === "chat"} />
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
