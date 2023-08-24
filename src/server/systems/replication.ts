import { AnyComponent, World, useEvent } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { Players } from "@rbxts/services";
import { Human, Plr, Renderable } from "shared/components";
import { UsableDirectionalMovementContext } from "shared/components/movements";
import { ComponentNames, ReplicationMap } from "shared/components/serde";
import { network } from "shared/network";

const REPLICATED_COMPONENTS = new Set<ComponentCtor>([Renderable, Plr, Human]);

function replication(w: World) {
    for (const [, plr] of useEvent(Players, "PlayerAdded")) {
        const payload: ReplicationMap = new Map();

        for (const [e, entityData] of w) {
            const entityPayload = new Map<ComponentNames, { data: AnyComponent }>();
            payload.set(tostring(e), entityPayload);

            for (const [component, componentInstance] of entityData) {
                if (REPLICATED_COMPONENTS.has(component)) {
                    entityPayload.set(tostring(component) as ComponentNames, {
                        data: componentInstance,
                    });
                }
            }
        }

        network.replication.fire(plr, payload);
    }

    const changes: ReplicationMap = new Map();

    for (const component of REPLICATED_COMPONENTS) {
        for (const [entityId, record] of w.queryChanged(component)) {
            const key = tostring(entityId);
            const name = tostring(component) as ComponentNames;

            if (!changes.has(key)) {
                changes.set(key, new Map());
            }

            if (w.contains(entityId)) {
                changes.get(key)?.set(name, { data: record.new! });
            }
        }
    }

    if (!changes.isEmpty()) {
        network.replication.fireAll(changes);
    }
}

export = { system: replication, priority: math.huge };
