import { produce } from "@rbxts/immut";
import { AnyComponent, AnyEntity, World, useEvent, useThrottle } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { Players } from "@rbxts/services";
import Sift from "@rbxts/sift";
import { Components } from "shared/components";
import { DoNotReplicate } from "shared/components/creators/bidirectionalComponent";
import { REPLICATED_COMPONENTS } from "shared/components/creators/replicatedComponent";
import { ComponentNames, ReplicationMap } from "shared/components/serde";
import { routes } from "shared/network";

function filterDoNotReplicate(w: World, player: Player, entities: ReplicationMap) {
    return produce(entities, (draft) => {
        draft.forEach((componentMap, eId) => {
            const e = tonumber(eId) as AnyEntity;

            if (!w.contains(e)) return;

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

const replicationStreaks: Map<ComponentCtor, number> = new Map();
const payloadedPlayers: Set<Player> = new Set();

function replication(w: World, _: any, remoteToken: string) {
    for (const [, player] of useEvent(Players, "PlayerRemoving")) {
        payloadedPlayers.delete(player);
    }

    for (const [, player, token] of routes.ecsRequestPayload.query()) {
        assert(token === remoteToken, "HAHA YOU HACKER");

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

        const filteredPayload = filterDoNotReplicate(w, player as Player, payload);
        if (filteredPayload.isEmpty()) continue;

        payloadedPlayers.add(player as Player);
        routes.ecsReplication.send(filteredPayload).to(player);
    }

    const changes: ReplicationMap = new Map();

    for (const Ctor of REPLICATED_COMPONENTS) {
        let ctorHasChange = false;
        for (const [e, record] of w.queryChanged(Ctor)) {
            const key = tostring(e);
            const name = tostring(Ctor) as ComponentNames;

            if (
                record.new !== undefined &&
                record.old !== undefined &&
                Sift.Dictionary.equals(record.new, record.old)
            )
                continue;

            if (!changes.has(key)) {
                changes.set(key, new Map());
            }

            if (w.contains(e)) {
                changes.get(key)?.set(name, { data: record.new! });
            }

            ctorHasChange = true;
        }

        if (ctorHasChange) {
            const newStreak = (replicationStreaks.get(Ctor) ?? 0) + 1;
            replicationStreaks.set(Ctor, newStreak);
            if (newStreak > 10 && useThrottle(0.2, Ctor)) {
                warn(`${tostring(Ctor)} replicated ${newStreak} timesconsecutively`);
            }
        } else {
            replicationStreaks.delete(Ctor);
        }
    }

    if (!changes.isEmpty()) {
        payloadedPlayers.forEach((player) => {
            // Players.GetPlayers().forEach((player) => {
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
