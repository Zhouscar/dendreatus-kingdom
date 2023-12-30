import { AnyComponent, AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { t } from "@rbxts/t";
import { ComponentNames, ReplicationMap, UnionComponentsMap } from "shared/components/serde";
import { network } from "shared/network";
import { State } from "shared/state";
import { Components, Sound } from "shared/components";
import { Players } from "@rbxts/services";

function recieveReplication(w: World, s: State) {
    const entityIdMap = s.serverToClientEntityIdMap;
    const reserveEntityIdMap = s.clientToServerEntityIdMap;

    network.replication.connect((entities: ReplicationMap) => {
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

            const componentsToInsert = new Array<AnyComponent>();
            const componentsToRemove = new Array<ComponentCtor>();

            const insertNames = new Array<string>();
            const removeNames = new Array<string>();

            for (const [name, container] of componentMap) {
                if (container.data !== undefined) {
                    if (name === "Sound") {
                        const creator = (container.data as Sound).creator;
                        if (creator === Players.LocalPlayer) continue;
                    } // player created sound can only be passed from client to server

                    assert(
                        Components[name as ComponentNames],
                        `Error instantiating component when recieving replication: ${name}`,
                    );
                    componentsToInsert.push(
                        Components[name as ComponentNames](
                            container.data as unknown as UnionToIntersection<UnionComponentsMap>,
                        ),
                    );
                    insertNames.push(name);
                } else {
                    if (name === "Sound") continue; // sound deletion is processed by the client itself

                    componentsToRemove.push(Components[name as ComponentNames]);
                    removeNames.push(name);
                }
            }

            if (clientEntityId === undefined) {
                clientEntityId = w.spawn(...componentsToInsert);

                entityIdMap.set(serverEntityId, clientEntityId);
                reserveEntityIdMap.set(
                    tostring(clientEntityId),
                    tonumber(serverEntityId) as AnyEntity,
                );
            } else {
                if (componentsToInsert.size() > 0) {
                    w.insert(clientEntityId, ...componentsToInsert);
                }

                if (componentsToRemove.size() > 0) {
                    w.remove(clientEntityId, ...componentsToRemove);
                }
            }
        }
    });
}

export = recieveReplication;
