import Roact from "@rbxts/roact";
import { useState, withHookDetection } from "@rbxts/roact-hooked";
import TestPanel from "../components/testPanel";
import Inventory from "../inventory";

withHookDetection(Roact);
export const story = () => {
    const [enabled, setEnabled] = useState(true);

    return (
        <>
            <TestPanel
                context={
                    new Map([
                        [
                            "toggle",
                            () => {
                                setEnabled(!enabled);
                            },
                        ],
                    ])
                }
            ></TestPanel>
            <Inventory enabled={enabled}></Inventory>
        </>
    );
};
