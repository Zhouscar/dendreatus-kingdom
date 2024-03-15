import { World } from "@rbxts/matter";
import recieveReplication from "./recieveReplication";
import { MONITORED_COMPONENTS } from "shared/components/creators/monitoredComponent";
import { DoNotSync } from "shared/components/creators/bidirectionalComponent";
import { ComponentNames, SyncMap } from "shared/components/serde";
import { routes } from "shared/routes";
import { State } from "shared/state";

function clientSync(w: World, s: State) {
    const changes: SyncMap = new Map();

    for (const Ctor of MONITORED_COMPONENTS) {
        for (const [e, record] of w.queryChanged(Ctor)) {
            if (!w.contains(e)) continue;

            const doNotSync = w.get(e, DoNotSync);
            if (doNotSync && doNotSync.ctors.has(Ctor)) continue;

            const key = tostring(s.clientToServerEntityIdMap.get(tostring(e)));
            const name = tostring(Ctor) as ComponentNames;

            if (!changes.has(key)) {
                changes.set(key, new Map());
            }

            changes.get(key)?.set(name, { data: record.new! });
        }
    }

    if (!changes.isEmpty()) {
        routes.ecsSync.send(changes);
    }

    for (const [e] of w.query(DoNotSync)) {
        w.remove(e, DoNotSync);
    }
}

export = { system: clientSync, after: recieveReplication };
