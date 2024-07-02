import { World, useEvent } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Renderable } from "shared/components";

function removeMissingModels(w: World): void {
    for (const [e, renderable] of w.query(Renderable)) {
        if (!renderable.pv) continue;
        for (const _ of useEvent(renderable.pv, "AncestryChanged")) {
            if (!renderable.pv.IsDescendantOf(Workspace)) {
                w.despawn(e);
                break;
            }
        }
    }

    for (const [e, record] of w.queryChanged(Renderable)) {
        if (!w.contains(e)) continue;

        if (record.new) continue;
        record.old?.pv?.Destroy();
    }
}

export = removeMissingModels;
