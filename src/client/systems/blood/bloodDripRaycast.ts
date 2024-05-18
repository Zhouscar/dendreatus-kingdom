import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { findInstanceE } from "shared/calculations/findEntity";
import { getPositionerCurrent } from "shared/calculations/positioner";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, BloodDrip, Human, Positioner, Sound } from "shared/components";
import { doSplatter } from "shared/effects/blood";
import { raycastVisualizePartsContainer, visualize } from "shared/effects/raycastHitbox";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { State } from "shared/state";

const ALPHA = 1;

function bloodDripRaycast(w: World, s: State) {
    const now = os.clock();

    for (const [e, bloodDrip, positioner] of w.query(BloodDrip, Positioner)) {
        const positionerCurrent = getPositionerCurrent(positioner, now);

        const result = Workspace.Raycast(
            positionerCurrent.position,
            positionerCurrent.velocity.Unit.mul(ALPHA),
            positioner.raycastParams,
        );
        // visualize(
        //     positionerCurrent.position,
        //     positionerCurrent.position.add(positionerCurrent.velocity.mul(ALPHA)),
        // );
        // TODO weird that only one or two parts are actually working

        if (!result) continue;
        if (!result.Instance.Anchored || !result.Instance.CanCollide) continue;

        const instanceE = findInstanceE(w, result.Instance);
        if (instanceE !== undefined) continue;

        doSplatter(w, e, new CFrame(result.Position, result.Position.add(result.Normal)));
    }
}

export = { system: bloodDripRaycast, event: "onPhysics" };
