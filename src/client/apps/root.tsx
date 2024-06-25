import { World } from "@rbxts/matter";
import { WProvider } from "./contexts/world";
import Roact from "@rbxts/roact";
import { ReflexProvider } from "@rbxts/roact-reflex";
import { store } from "client/store";
import { RemoteTokenProvider } from "./contexts/remoteToken";
import ClockTimeHandler from "./clockTimeHandler";
import { ClientState, State } from "shared/state";
import ClientStateHandler from "./clientStateHandlers";
import useSingletonE from "./hooks/useSingletonE";
import { LocalPlr } from "shared/components";

function App() {
    return (
        <>
            <ClockTimeHandler />
            {/* <screengui Key={"Root"} ResetOnSpawn={false}>
                <InventoryHandler />
                <SpawningHandler enabled={clientState === "spawning"} />
                <TitleCard enabled={clientState === "title"} />
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
            </screengui> */}

            <ClientStateHandler></ClientStateHandler>
        </>
    );
}

export default function Root(props: {
    w: World;
    setClientState: (state: ClientState) => void;
    remoteToken: string;
}) {
    const localPlrE = useSingletonE(LocalPlr);

    return (
        <WProvider
            value={{ w: props.w, setClientState: props.setClientState, localPlrE: localPlrE }}
        >
            <RemoteTokenProvider value={{ remoteToken: props.remoteToken }}>
                <ReflexProvider producer={store}>
                    <App />
                </ReflexProvider>
            </RemoteTokenProvider>
        </WProvider>
    );
}
