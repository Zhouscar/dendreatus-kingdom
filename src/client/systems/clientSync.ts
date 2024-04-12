import { AnyEntity, useThrottle, World } from "@rbxts/matter";
import recieveReplication from "./recieveReplication";
import { MONITORED_COMPONENTS } from "shared/components/creators/monitoredComponent";
import { DoNotSync } from "shared/components/creators/bidirectionalComponent";
import { ComponentNames, SyncMap } from "shared/components/serde";
import { routes } from "shared/routes";
import { State } from "shared/state";
import Sift from "@rbxts/sift";

let syncStreak = 0;

function clientSync(w: World, s: State) {
    const changes: SyncMap = new Map();

    for (const Ctor of MONITORED_COMPONENTS) {
        for (const [e, record] of w.queryChanged(Ctor)) {
            if (!w.contains(e)) continue;

            const doNotSync = w.get(e, DoNotSync);
            if (doNotSync && doNotSync.ctors.has(Ctor)) continue;

            if (
                record.new !== undefined &&
                record.old !== undefined &&
                Sift.Dictionary.equals(record.new, record.old)
            )
                continue;
            // now I don't even have to worry about consecutive sync

            const key = tostring(s.clientToServerEntityIdMap.get(tostring(e)));
            const name = tostring(Ctor) as ComponentNames;

            if (!changes.has(key)) {
                changes.set(key, new Map());
            }

            // print(name);
            changes.get(key)!.set(name, { data: record.new! });
        }
    }

    changes.forEach((componentMap, eId) => {
        if (componentMap.isEmpty()) {
            changes.delete(eId);
        }
    });

    if (!changes.isEmpty()) {
        routes.ecsSync.send(changes);
        syncStreak++;
    } else {
        syncStreak = 0;
    }

    if (syncStreak > 10 && useThrottle(1)) {
        warn("CONSECUTIVE SYNCING IS DETECTED, COMPONENTS NEEDS OPTIMIZATION");
    }

    for (const [e] of w.query(DoNotSync)) {
        w.remove(e, DoNotSync);
    }
}

export = { system: clientSync, after: recieveReplication };
