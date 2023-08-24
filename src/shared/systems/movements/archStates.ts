import { World } from "@rbxts/matter";
import { Human } from "shared/components";
import { InAir, InWater, OnLand } from "shared/components/movements";

function archStates(w: World) {
    for (const [e, humanRecord] of w.queryChanged(Human)) {
        if (humanRecord.new !== undefined) continue;
        w.remove(e, OnLand, InAir, InWater);
    }

    for (const [e, human] of w.query(Human)) {
        const humanoidState = human.humanoid.GetState().Name;
        const newArchStateComponent: OnLand | InAir | InWater =
            humanoidState === "Freefall"
                ? InAir({})
                : humanoidState === "Swimming"
                ? InWater({})
                : OnLand({});

        w.remove(e, OnLand, InAir, InWater);
        w.insert(e, newArchStateComponent);
    }
}

export = { system: archStates, event: "onPhysics" };
