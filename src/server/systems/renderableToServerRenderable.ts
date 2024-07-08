import { World } from "@rbxts/matter";
import { CollectionService } from "@rbxts/services";
import { Renderable, ServerRenderable } from "shared/components";
import { hasComponents } from "shared/hooks/components";
import { State } from "shared/state";

function renderableToServerRenderable(w: World, s: State) {
    for (const [e, renderable] of w.query(Renderable)) {
        if (hasComponents(w, e, ServerRenderable)) continue;

        w.insert(e, ServerRenderable({}));
        CollectionService.AddTag(renderable.pv, "ServerRenderable");
    }

    for (const [e, renderableRecord] of w.queryChanged(Renderable)) {
        if (renderableRecord.new === undefined && w.contains(e)) {
            w.remove(e, ServerRenderable);
        }
    }
}

export = renderableToServerRenderable;
