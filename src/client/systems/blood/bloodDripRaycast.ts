import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { findInstanceE } from "shared/calculations/findEntity";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Animatable, Human, Sound } from "shared/components";
import { doSplatter } from "shared/effects/blood";
import { raycastVisualizePartsContainer } from "shared/effects/raycastHitbox";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { State } from "shared/state";

const ALPHA = 1;

const dripped: Set<BasePart> = new Set();

const dripSoundId = withAssetPrefix("9120512830");

function bloodDripRaycast(w: World, s: State) {
    s.bloodDrips.forEach((context) => {
        const dripPart = context[0];
        const creator = context[1];

        const params = new RaycastParams();
        params.FilterType = Enum.RaycastFilterType.Exclude;
        params.FilterDescendantsInstances = [dripPart, creator, raycastVisualizePartsContainer];
        params.IgnoreWater = true;

        const result = Workspace.Raycast(
            dripPart.Position,
            dripPart.AssemblyLinearVelocity.Unit.mul(ALPHA),
            params,
        );
        if (!result) return;
        if (!result.Instance.Anchored || !result.Instance.CanCollide) return;
        const e = findInstanceE(w, result.Instance);
        if (e !== undefined && hasOneOfComponents(w, e, Human, Animatable)) return;

        if (dripped.has(dripPart)) return;
        dripped.add(dripPart);
        dripPart.Destroying.Once(() => {
            dripped.delete(dripPart);
        });

        doSplatter(new CFrame(result.Position, result.Position.add(result.Normal)));
    });
}

export = { system: bloodDripRaycast, event: "onPhysics" };
