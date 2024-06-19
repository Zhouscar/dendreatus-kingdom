import { AnyComponent, AnyEntity, World } from "@rbxts/matter";
import { Component, ComponentCtor } from "@rbxts/matter/lib/component";
import { t } from "@rbxts/t";
import { State } from "shared/state";
import { routes } from "shared/network";
import { Components } from "shared/components";
import { ComponentNames, UnionComponentsMap } from "shared/components/serde";
import {
    BIDIRECTIONAL_COMPONENTS,
    DoNotSync,
} from "shared/components/creators/bidirectionalComponent";

function recieveReplication(w: World, s: State) {
    const entityIdMap = s.serverToClientEntityIdMap;
    const reserveEntityIdMap = s.clientToServerEntityIdMap;

    for (const [pos, _, entities] of routes.ecsReplication.query()) {
        assert(t.map(t.string, t.table)(entities));

        for (const [serverEntityId, componentMap] of entities) {
            let clientEntityId = entityIdMap.get(serverEntityId);

            if (clientEntityId !== undefined && next(componentMap)[0] === undefined) {
                if (w.contains(clientEntityId)) {
                    w.despawn(clientEntityId);
                }
                entityIdMap.delete(serverEntityId);
                reserveEntityIdMap.delete(tostring(clientEntityId));

                continue;
            }

            const componentsToInsert = new Array<[ComponentCtor, AnyComponent]>();
            const componentsToRemove = new Array<ComponentCtor>();

            for (const [name, container] of componentMap) {
                if (container.data !== undefined) {
                    assert(
                        Components[name as ComponentNames],
                        `Error instantiating component when recieving replication: ${name}`,
                    );

                    const Ctor = Components[name as ComponentNames];
                    const comp = Ctor(
                        container.data as unknown as UnionToIntersection<UnionComponentsMap>,
                    );

                    componentsToInsert.push([Ctor, comp]);
                } else {
                    componentsToRemove.push(Components[name as ComponentNames]);
                }
            }

            if (clientEntityId === undefined) {
                clientEntityId = w.spawn(...componentsToInsert.map((context) => context[1]));

                entityIdMap.set(serverEntityId, clientEntityId);
                reserveEntityIdMap.set(
                    tostring(clientEntityId),
                    tonumber(serverEntityId) as AnyEntity,
                );
            } else {
                if (componentsToInsert.size() > 0 && w.contains(clientEntityId)) {
                    w.insert(clientEntityId, ...componentsToInsert.map((context) => context[1]));
                }

                if (componentsToRemove.size() > 0 && w.contains(clientEntityId)) {
                    w.remove(clientEntityId, ...componentsToRemove);
                }
            }

            const doNotSyncCtors = new Set<ComponentCtor>();
            componentsToInsert
                .filter((context) => BIDIRECTIONAL_COMPONENTS.has(context[0]))
                .forEach((context) => {
                    doNotSyncCtors.add(context[0]);
                });
            componentsToRemove
                .filter((Ctor) => BIDIRECTIONAL_COMPONENTS.has(Ctor))
                .forEach((Ctor) => {
                    doNotSyncCtors.add(Ctor);
                });

            if (doNotSyncCtors.size() > 0 && w.contains(clientEntityId)) {
                w.insert(clientEntityId, DoNotSync({ ctors: doNotSyncCtors }));
            }
        }
    }
}

export = { system: recieveReplication, priority: 0 };
