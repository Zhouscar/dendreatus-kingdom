import { World, useEvent } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Renderable, ServerRenderable } from "shared/components";
import { hasComponents } from "shared/hooks/components";
import { HOST } from "shared/host";

function removeMissingModels(w: World): void {
    for (const [e, renderable] of w.query(Renderable)) {
        for (const _ of useEvent(renderable.pv, "AncestryChanged")) {
            if (!renderable.pv.IsDescendantOf(Workspace)) {
                if (HOST === "CLIENT" && hasComponents(w, e, ServerRenderable)) continue;
                w.despawn(e);
                break;
            }
        }
    }

    for (const [e, record] of w.queryChanged(Renderable)) {
        if (record.new) continue;
        record.old?.pv?.Destroy();
    }
}

export = removeMissingModels;
