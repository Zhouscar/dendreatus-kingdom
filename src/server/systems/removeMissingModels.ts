import { World, useEvent } from "@rbxts/matter";
import { Renderable } from "shared/components";

function removeMissingModels(world: World): void {
    for (const [id, model] of world.query(Renderable)) {
        if (!model.model) continue;
        for (const _ of useEvent(model.model, "AncestryChanged")) {
            if (!model.model.IsDescendantOf(game)) {
                world.remove(id, Renderable);
                break;
            }
        }
    }

    for (const [_, record] of world.queryChanged(Renderable)) {
        if (record.new) continue;
        record.old?.model?.Destroy();
    }
}

export = removeMissingModels;
