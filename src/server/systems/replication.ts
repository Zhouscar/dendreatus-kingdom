import { produce } from "@rbxts/immut";
import { AnyComponent, AnyEntity, World, useEvent } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Components } from "shared/components";
import { DoNotReplicate } from "shared/components/creators/bidirectionalComponent";
import { REPLICATED_COMPONENTS } from "shared/components/creators/replicatedComponent";
import { ComponentNames, ReplicationMap } from "shared/components/serde";
import { routes } from "shared/routes";

function filterDoNotReplicate(w: World, player: Player, entities: ReplicationMap) {
    return produce(entities, (draft) => {
        draft.forEach((componentMap, eId) => {
            const e = tonumber(eId) as AnyEntity;

            const doNotReplicate = w.get(e, DoNotReplicate);
            if (!doNotReplicate) return;

            componentMap.forEach((container, name) => {
                const Ctor = Components[name as ComponentNames];
                const playerToNotReplicate = doNotReplicate.playersOfCtors.get(Ctor);

                if (playerToNotReplicate === player || playerToNotReplicate === "ALL") {
                    componentMap.delete(name);
                }
            });

            if (componentMap.size() === 0) {
                draft.delete(eId);
            }
        });
    });
}

function replication(w: World) {
    for (const [, player] of useEvent(Players, "PlayerAdded")) {
        const payload: ReplicationMap = new Map();

        for (const [e, entityData] of w) {
            const entityPayload = new Map<ComponentNames, { data: AnyComponent }>();
            payload.set(tostring(e), entityPayload);

            for (const [Ctor, componentInstance] of entityData) {
                if (REPLICATED_COMPONENTS.has(Ctor)) {
                    entityPayload.set(tostring(Ctor) as ComponentNames, {
                        data: componentInstance,
                    });
                }
            }
        }

        const filteredPayload = filterDoNotReplicate(w, player, payload);
        if (filteredPayload.isEmpty()) continue;

        routes.ecsReplication.send(filteredPayload).to(player);
    }

    const changes: ReplicationMap = new Map();

    for (const Ctor of REPLICATED_COMPONENTS) {
        for (const [e, record] of w.queryChanged(Ctor)) {
            const key = tostring(e);
            const name = tostring(Ctor) as ComponentNames;

            if (!changes.has(key)) {
                changes.set(key, new Map());
            }

            if (w.contains(e)) {
                changes.get(key)?.set(name, { data: record.new! });
            }
        }
    }

    if (!changes.isEmpty()) {
        Players.GetPlayers().forEach((player) => {
            const filteredChanges = filterDoNotReplicate(w, player, changes);
            if (filteredChanges.isEmpty()) return;
            routes.ecsReplication.send(filteredChanges).to(player);
        });
    }

    for (const [e] of w.query(DoNotReplicate)) {
        w.remove(e, DoNotReplicate);
    }
}

export = { system: replication, priority: math.huge };
