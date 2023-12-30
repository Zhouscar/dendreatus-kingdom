import Roact from "@rbxts/roact";
import { useState, withHookDetection } from "@rbxts/roact-hooked";
import HealthBar from "../healthBar";
import TestPanel from "../components/testPanel";

withHookDetection(Roact);

export const story = () => {
    const [health, setHealth] = useState(100);

    return (
        <>
            <HealthBar
                Position={new UDim2(0.2, 0, 0.6, 0)}
                maximum={100}
                current={health}
                enabled={true}
            ></HealthBar>
            <TestPanel
                context={
                    new Map([
                        [
                            "damage",
                            () => {
                                setHealth((health) => math.max(0, health - 10));
                            },
                        ],
                    ])
                }
            ></TestPanel>
        </>
    );
};
