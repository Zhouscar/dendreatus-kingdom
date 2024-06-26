import Roact from "@rbxts/roact";
import EntireScreen from "client/apps/components/entireScreen";
import { EnabilityProvider } from "client/apps/contexts/enability";
import HealthBar from "client/apps/healthBar";
import { useClientState } from "client/apps/hooks/ecsSelectors";
import { useEnability } from "client/apps/hooks/enability";
import Hotbar from "client/apps/hotbar";
import HungerBar from "client/apps/hungerBar";
import Interactables from "./interactables";
import GameCameraHandler from "./camera";
import EquippingHandler from "./equipping";

export default function GameHandler(props: {}) {
    const [clientState, setClientState] = useClientState();
    const enability = useEnability();
    return (
        <EnabilityProvider value={{ enabled: clientState === "game" }}>
            <GameCameraHandler />
            <Interactables />
            <EquippingHandler />
            <EntireScreen handleInset={false} superPositionEnability={enability}>
                <HealthBar
                    Size={new UDim2(0.5, 0, 0, 20)}
                    Position={new UDim2(0.5, 0, 1, -150)}
                    AnchorPoint={new Vector2(0.5, 0)}
                />
                <HungerBar
                    Size={new UDim2(0.5, 0, 0, 20)}
                    Position={new UDim2(0.5, 0, 1, -130)}
                    AnchorPoint={new Vector2(0.5, 0)}
                />
                <Hotbar />
            </EntireScreen>
        </EnabilityProvider>
    );
}
