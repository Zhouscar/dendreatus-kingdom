import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Renderable, Transform } from "shared/components";

function updateTransforms(world: World) {
    for (const [id, _] of world.query(Transform).without(Renderable)) {
        world.remove(id, Transform);
    }

    for (const [id, record] of world.queryChanged(Transform)) {
        if (!world.contains(id)) continue;
        const renderable = world.get(id, Renderable);
        if (!renderable || !record.new || record.new._doNotReconcile) continue;
        renderable.model?.PivotTo(record.new.cf);
    }

    for (const [id, record] of world.queryChanged(Renderable)) {
        if (!world.contains(id)) continue;
        const transform = world.get(id, Transform);
        if (!transform) {
            world.insert(id, Transform({ _doNotReconcile: true, cf: CFrame.identity }));
            continue;
        }
        record.new?.model?.PivotTo(transform.cf);
    }

    for (const [id, renderable, transform] of world.query(Renderable, Transform)) {
        if (!renderable.model) continue;

        const primaryPart = renderable.model.PrimaryPart;
        if (!primaryPart) continue;

        if (primaryPart.Anchored) continue;

        if (transform.cf.Y < Workspace.FallenPartsDestroyHeight) {
            world.despawn(id);
            continue;
        }

        if (transform.cf !== primaryPart.CFrame) {
            world.insert(
                id,
                Transform({
                    cf: primaryPart.CFrame,
                    _doNotReconcile: true,
                }),
            );
        }
    }
}

export = updateTransforms;
