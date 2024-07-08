import { AnyEntity, useThrottle, World } from "@rbxts/matter";
import recieveReplication from "./recieveReplication";
import { MONITORED_COMPONENTS } from "shared/components/creators/monitoredComponent";
import { DoNotSync } from "shared/components/creators/bidirectionalComponent";
import { ComponentNames, SyncMap } from "shared/components/serde";
import { routes } from "shared/network";
import { State } from "shared/state";
import Sift from "@rbxts/sift";
import { ComponentCtor } from "@rbxts/matter/lib/component";

const syncStreaks: Map<ComponentCtor, number> = new Map();

function clientSync(w: World, s: State, remoteToken: string) {
    const changes: SyncMap = new Map();

    for (const Ctor of MONITORED_COMPONENTS) {
        let ctorHasChange = false;

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

            const key = tostring(s.clientToServerEMap.get(tostring(e)));
            const name = tostring(Ctor) as ComponentNames;

            if (!changes.has(key)) {
                changes.set(key, new Map());
            }

            changes.get(key)!.set(name, { data: record.new! });

            ctorHasChange = true;
        }

        if (ctorHasChange) {
            const newStreak = (syncStreaks.get(Ctor) ?? 0) + 1;
            syncStreaks.set(Ctor, newStreak);
            if (newStreak > 10 && useThrottle(0.2, Ctor)) {
                warn(`${tostring(Ctor)} synced ${newStreak} times consecutively`);
            }
        } else {
            syncStreaks.delete(Ctor);
        }
    }

    changes.forEach((componentMap, eId) => {
        if (componentMap.isEmpty()) {
            changes.delete(eId);
        }
    });

    if (!changes.isEmpty()) {
        routes.ecsSync.send(remoteToken, changes);
    }

    for (const [e] of w.query(DoNotSync)) {
        w.remove(e, DoNotSync);
    }
}

export = { system: clientSync, after: recieveReplication };
