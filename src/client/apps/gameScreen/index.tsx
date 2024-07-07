import Roact from "@rbxts/roact";
import Transition from "../components/transition";
import Hotbar from "../hotbar";
import HealthBar from "../healthBar";
import HungerBar from "../hungerBar";
import useLocalPlrE from "../hooks/useLocalPlrE";
import { IMAGE_IDS } from "shared/features/ids/images";
import useComponent from "../hooks/useComponent";
import { Health } from "shared/components/health";
import { useMemo } from "@rbxts/roact-hooked";
import SpringLoopedSound from "../components/springLoopedSound";

export default function GameScreen(props: { enabled: boolean }) {
    const enabled = props.enabled;

    const localPlrE = useLocalPlrE();

    const health = useComponent(localPlrE, Health);
    const healthPerc = useMemo(() => {
        if (health === undefined) return 1;
        return health.current / health.maximum;
    }, [health]);

    return (
        <Transition enabled={enabled}>
            <SpringLoopedSound
                soundName={"lowHealth"}
                volume={!enabled ? 0 : 2 * math.max(0.5 - healthPerc, 0)}
                speed={5 * math.max(0.5 - healthPerc, 0) + 2}
            />
            <Hotbar />
            <HealthBar
                e={localPlrE}
                showNumber={true}
                Size={new UDim2(0, 300, 0, 15)}
                Position={new UDim2(0, 10, 1, -25)}
                AnchorPoint={new Vector2(0, 1)}
            />
            <HungerBar
                e={localPlrE}
                showNumber={true}
                Size={new UDim2(0, 300, 0, 15)}
                Position={new UDim2(0, 10, 1, -10)}
                AnchorPoint={new Vector2(0, 1)}
            />
            <imagelabel
                Size={UDim2.fromScale(1, 1)}
                Image={IMAGE_IDS.lowHealth}
                BackgroundTransparency={1}
                ImageTransparency={healthPerc * 2}
            />
        </Transition>
    );
}
