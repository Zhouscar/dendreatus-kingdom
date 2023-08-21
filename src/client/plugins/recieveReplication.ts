import { AnyComponent, AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { t } from "@rbxts/t";
import { ComponentNames, ReplicationMap, UnionComponentsMap } from "shared/components/serde";
import { network } from "shared/network";
import { State } from "shared/state";
import { Components } from "shared/components";

function recieveReplication(world: World, state: State) {
    const entityIdMap = state.serverToClientEntityIdMap;
    const reserveEntityIdMap = state.clientToServerEntityIdMap;

    network.replication.connect((entities: ReplicationMap) => {
        assert(t.map(t.string, t.table)(entities));

        for (const [serverEntityId, componentMap] of entities) {
            let clientEntityId = entityIdMap.get(serverEntityId);

            if (clientEntityId !== undefined && next(componentMap)[0] === undefined) {
                world.despawn(clientEntityId);
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
                    componentsToInsert.push(
                        Components[name as ComponentNames](
                            container.data as unknown as UnionToIntersection<UnionComponentsMap>,
                        ),
                    );
                    insertNames.push(name);
                } else {
                    componentsToRemove.push(Components[name as ComponentNames]);
                    removeNames.push(name);
                }
            }

            if (clientEntityId === undefined) {
                clientEntityId = world.spawn(...componentsToInsert);

                entityIdMap.set(serverEntityId, clientEntityId);
                reserveEntityIdMap.set(
                    tostring(clientEntityId),
                    tonumber(serverEntityId) as AnyEntity,
                );
            } else {
                if (componentsToInsert.size() > 0) {
                    world.insert(clientEntityId, ...componentsToInsert);
                }

                if (componentsToRemove.size() > 0) {
                    world.remove(clientEntityId, ...componentsToRemove);
                }
            }
        }
    });
}

export = recieveReplication;
