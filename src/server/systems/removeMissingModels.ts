import { World, useEvent } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Renderable } from "shared/components";

function removeMissingModels(w: World): void {
    for (const [e, renderable] of w.query(Renderable)) {
        if (!renderable.model) continue;
        for (const _ of useEvent(renderable.model, "AncestryChanged")) {
            if (!renderable.model.IsDescendantOf(Workspace)) {
                w.despawn(e);
                break;
            }
        }
    }

    for (const [_, record] of w.queryChanged(Renderable)) {
        if (record.new) continue;
        record.old?.model?.Destroy();
    }
}

export = removeMissingModels;
