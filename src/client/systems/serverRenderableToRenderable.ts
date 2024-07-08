import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { index, indexPossible } from "shared/calculations/indexing";
import { Renderable, ServerRenderable } from "shared/components";
import { ID_ATTRIBUTE } from "shared/idAttribute";
import { State } from "shared/state";

function serverRenderableToRenderable(w: World, s: State) {
    for (const [e, serverRenderable] of w.query(ServerRenderable)) {
        const possibleInstances = indexPossible(game, serverRenderable.path);

        const serverE = s.clientToServerEntityIdMap.get(tostring(e));
        if (serverE === undefined) {
            warn("Not possible");
            continue;
        }

        let instance: Instance | undefined = undefined;
        possibleInstances.forEach((possibleInstance) => {
            const possibleInstanceServerE = possibleInstance.GetAttribute("serverEntityId");
            if (possibleInstanceServerE === serverE) {
                instance = possibleInstance;
            }
        });
        instance = instance as Instance | undefined;

        if (instance && instance.IsA("PVInstance") && instance.IsDescendantOf(Workspace)) {
            const renderable = w.get(e, Renderable);
            if (renderable !== undefined && renderable.pv === instance) continue;

            w.insert(e, Renderable({ pv: instance }));
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
