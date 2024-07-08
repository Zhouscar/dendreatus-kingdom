import { World } from "@rbxts/matter";
import { Renderable, ServerRenderable } from "shared/components";
import { State } from "shared/state";

function renderableToServerRenderable(w: World, s: State) {
    for (const [e, renderable] of w.query(Renderable)) {
        const path = renderable.pv.GetFullName();

        const serverRenderable = w.get(e, ServerRenderable);
        if (serverRenderable !== undefined && serverRenderable.path === path) continue;

        w.insert(e, ServerRenderable({ path: path }));
    }

    for (const [e, renderableRecord] of w.queryChanged(Renderable)) {
        if (renderableRecord.new === undefined && w.contains(e)) {
            w.remove(e, ServerRenderable);
        }
    }
}

export = renderableToServerRenderable;
