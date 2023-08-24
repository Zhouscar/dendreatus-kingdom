import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Renderable, Transform } from "shared/components";

function updateTransforms(w: World) {
    for (const [e, _] of w.query(Transform).without(Renderable)) {
        w.remove(e, Transform);
    }

    for (const [e, record] of w.queryChanged(Transform)) {
        if (!w.contains(e)) continue;
        const renderable = w.get(e, Renderable);
        if (!renderable || !record.new || record.new._doNotReconcile) continue;
        renderable.model?.PivotTo(record.new.cf);
    }

    for (const [e, record] of w.queryChanged(Renderable)) {
        if (!w.contains(e)) continue;
        const transform = w.get(e, Transform);
        if (!transform) {
            w.insert(e, Transform({ _doNotReconcile: true, cf: CFrame.identity }));
            continue;
        }
        record.new?.model?.PivotTo(transform.cf);
    }

    for (const [e, renderable, transform] of w.query(Renderable, Transform)) {
        if (!renderable.model) continue;

        const primaryPart = renderable.model.PrimaryPart;
        if (!primaryPart) continue;

        if (primaryPart.Anchored) continue;

        if (transform.cf.Y < Workspace.FallenPartsDestroyHeight) {
            w.despawn(e);
            continue;
        }

        if (transform.cf !== primaryPart.CFrame) {
            w.insert(
                e,
                Transform({
                    cf: primaryPart.CFrame,
                    _doNotReconcile: true,
                }),
            );
        }
    }
}

export = updateTransforms;
