import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { index } from "shared/calculations/indexing";
import { Renderable, ServerRenderable } from "shared/components";
import { State } from "shared/state";

function serverRenderableToRenderable(w: World, s: State) {
    for (const [e, serverRenderable] of w.query(ServerRenderable)) {
        const pv = index(game, serverRenderable.path);

        if (pv && pv.IsA("PVInstance") && pv.IsDescendantOf(Workspace)) {
            const renderable = w.get(e, Renderable);
            if (renderable !== undefined && renderable.pv === pv) continue;

            w.insert(e, Renderable({ pv: pv }));
        } else {
            w.remove(e, Renderable);
        }
    }

    for (const [e, serverRenderableRecord] of w.queryChanged(ServerRenderable)) {
        if (serverRenderableRecord.new === undefined && w.contains(e)) {
            w.remove(e, Renderable);
        }
    }
}

export = serverRenderableToRenderable;
