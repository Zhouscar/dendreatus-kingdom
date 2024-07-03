import Roact from "@rbxts/roact";
import { EnabilityProvider } from "../contexts/enability";
import EntireScreen from "../components/entireScreen";
import { useEnability, useEnabled } from "../hooks/enability";
import Hotbar from "../hotbar";
import HealthBar from "../healthBar";
import HungerBar from "../hungerBar";
import { useLocalPlrE } from "../hooks/ecsSelectors";

function App(props: {}) {
    const enabled = useEnabled();
    const enability = useEnability();

    const localPlrE = useLocalPlrE();

    return (
        <EntireScreen handleInset={false} superPositionEnability={enability}>
            <Hotbar enabled={enabled} />
            <HealthBar
                e={localPlrE}
                showNumber={true}
                enabled={enabled}
                Size={new UDim2(0, 300, 0, 15)}
                Position={new UDim2(0, 10, 1, -25)}
                AnchorPoint={new Vector2(0, 1)}
            />
            <HungerBar
                e={localPlrE}
                showNumber={true}
                enabled={enabled}
                Size={new UDim2(0, 300, 0, 15)}
                Position={new UDim2(0, 10, 1, -10)}
                AnchorPoint={new Vector2(0, 1)}
            />
        </EntireScreen>
    );
}

export default function GameScreen(props: { enabled: boolean }) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App />
        </EnabilityProvider>
    );
}
