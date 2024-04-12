import { useThrottle, World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Stomach } from "shared/components/hunger";

const TICK_RATE = 5;

function digestion(w: World) {
    if (!useThrottle(1 / TICK_RATE)) return;

    for (const [e, stomach] of w.query(Stomach)) {
        let digestAmount = 0;
        stomach.digest.forEach((amount) => {
            digestAmount += amount;
        });

        const newHunger = math.max(0, stomach.hunger - digestAmount);
        if (useChange([newHunger], e)) {
            w.insert(e, stomach.patch({ hunger: newHunger, digest: new Map() }));
        }
    }
}

export = digestion;
