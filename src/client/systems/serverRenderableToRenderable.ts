import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { CollectionService, Workspace } from "@rbxts/services";
import { Renderable } from "shared/components";
import { State } from "shared/state";

function crashReportCheckModel(instance: Instance): instance is PVInstance {
    if (!instance.IsA("PVInstance")) {
        warn(`${instance.GetFullName()} is not a PVInstance`);
    }
    return true;
}

function serverRenderableToRenderable(w: World, s: State) {
    for (const instance of CollectionService.GetTagged("ServerRenderable")) {
        if (!instance) continue;
        if (!crashReportCheckModel(instance)) continue;
        const serverE = instance.GetAttribute("serverEntityId");
        if (serverE === undefined) continue;
        const clientE = s.serverToClientEMap.get(tostring(serverE));
        if (clientE === undefined) continue;
        if (!w.contains(clientE)) continue;
        const renderable = w.get(clientE, Renderable);
        if (renderable?.pv === instance) continue;
        w.insert(clientE, Renderable({ pv: instance }));
    }
}

export = { system: serverRenderableToRenderable };
