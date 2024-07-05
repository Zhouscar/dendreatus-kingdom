import { World } from "@rbxts/matter";
import { WProvider } from "./contexts/world";
import Roact from "@rbxts/roact";
import { ReflexProvider } from "@rbxts/roact-reflex";
import { store } from "client/store";
import Inventory from "./inventory";
import Interactables from "./interactables";
import DeathScreen from "./deathScreen";
import ClockTimeHandler from "./clockTimeHandler";
import TitleCard from "./titleCard";
import { ClientState, State } from "shared/state";
import SpawningHandler from "./spawningHandler";
import ProximityPlrs from "./proximityPlrs";
import ChatScreen from "./chatScreen";
import MouseClickEffects from "./mouseClickSound";
import GameScreen from "./gameScreen";
import SignScreen from "./signScreen";
import useClientState from "./hooks/useClientState";
import useLocalPlrE from "./hooks/useLocalPlrE";

function App() {
    const clientState = useClientState();
    const localPlrE = useLocalPlrE();

    return (
        <>
            <ClockTimeHandler />
            <screengui
                Key={"Root"}
                ResetOnSpawn={false}
                IgnoreGuiInset={true}
                ZIndexBehavior={"Sibling"}
            >
                <MouseClickEffects />
                <SpawningHandler enabled={clientState === "spawning"} />
                <TitleCard enabled={clientState === "title"} />
                <Inventory enabled={clientState === "inventory"} />
                <GameScreen enabled={clientState === "game"} />
                <Interactables enabled={clientState === "game"} />
                <ProximityPlrs enabled={clientState === "game" || clientState === "chat"} />
                <DeathScreen enabled={clientState === "death"} />
                <ChatScreen enabled={clientState === "chat"} />
                <SignScreen enabled={clientState === "sign"} />
            </screengui>
        </>
    );
}

export default function Root(props: { w: World; s: State; remoteToken: string }) {
    return (
        <WProvider value={{ w: props.w, s: props.s, remoteToken: props.remoteToken }}>
            <ReflexProvider producer={store}>
                <App />
            </ReflexProvider>
        </WProvider>
    );
}
