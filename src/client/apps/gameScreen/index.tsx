import Roact from "@rbxts/roact";
import Transition from "../components/transition";
import Hotbar from "../hotbar";
import HealthBar from "../healthBar";
import HungerBar from "../hungerBar";
import { useSelector } from "@rbxts/roact-reflex";
import { selectLocalPlrE } from "client/store/ecs";
import useLocalPlrE from "../hooks/useLocalPlrE";

export default function GameScreen(props: { enabled: boolean }) {
    const enabled = props.enabled;

    const localPlrE = useLocalPlrE();

    return (
        <Transition enabled={enabled}>
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
        </Transition>
    );
}
