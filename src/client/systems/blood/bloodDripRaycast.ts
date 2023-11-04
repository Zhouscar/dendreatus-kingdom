import { World } from "@rbxts/matter";
import { Players, Workspace } from "@rbxts/services";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Sound } from "shared/components";
import { doSplatter } from "shared/effects/blood";
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
        params.FilterDescendantsInstances = [dripPart, creator];
        params.IgnoreWater = true;

        const result = Workspace.Raycast(
            dripPart.Position,
            dripPart.AssemblyLinearVelocity.Unit.mul(ALPHA),
            params,
        );
        if (!result) return;
        if (!result.Instance.Anchored || !result.Instance.CanCollide) return;

        if (dripped.has(dripPart)) return;
        dripped.add(dripPart);
        dripPart.Destroying.Once(() => {
            dripped.delete(dripPart);
        });

        w.spawn(
            Sound({
                creator: "server",
                audibility: 0,
                context: {
                    volume: 1,
                    speed: 1,
                    soundId: dripSoundId,
                },
                cf: new CFrame(result.Position),
            }),
        );
        doSplatter(new CFrame(result.Position, result.Position.add(result.Normal)));
    });
}

export = { system: bloodDripRaycast, event: "onPhysics" };
