import { AnyComponent, AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { t } from "@rbxts/t";
import { State } from "shared/state";
import { routes } from "shared/routes";
import { Components, Plr } from "shared/components";
import { ComponentNames, UnionComponentsMap } from "shared/components/serde";
import {
    BIDIRECTIONAL_COMPONENTS,
    DoNotReplicate,
    PROTECTED_BIDIRECTIONAL_COMPONENTS,
} from "shared/components/creators/bidirectionalComponent";
import replication from "./replication";

function recieveSync(w: World, s: State) {
    for (const [pos, player, entities] of routes.ecsSync.query()) {
        assert(t.map(t.string, t.table)(entities));

        for (const [eId, componentMap] of entities) {
            let e = tonumber(eId) as AnyEntity;

            if (e !== undefined && next(componentMap)[0] === undefined) {
                if (w.contains(e)) {
                    w.despawn(e);
                }
                continue;
            }

            const componentsToInsert = new Array<[ComponentCtor, AnyComponent]>();
            const componentsToRemove = new Array<ComponentCtor>();

            for (const [name, container] of componentMap) {
                const Ctor = Components[name as ComponentNames];
                if (PROTECTED_BIDIRECTIONAL_COMPONENTS.has(Ctor)) {
                    const plr = w.get(e, Plr);
                    if (plr?.player !== player) {
                        continue;
                    }
                }

                if (container.data !== undefined) {
                    assert(
                        Components[name as ComponentNames],
                        `Error instantiating component when recieving replication: ${name}`,
                    );

                    const comp = Ctor(
                        container.data as unknown as UnionToIntersection<UnionComponentsMap>,
                    );

                    componentsToInsert.push([Ctor, comp]);
                } else {
                    componentsToRemove.push(Ctor);
                }
            }

            if (e === undefined) {
                e = w.spawn(...componentsToInsert.map((context) => context[1]));
            } else {
                if (componentsToInsert.size() > 0) {
                    w.insert(e, ...componentsToInsert.map((context) => context[1]));
                }

                if (componentsToRemove.size() > 0) {
                    w.remove(e, ...componentsToRemove);
                }
            }

            const doNotReplicatePlayersOfCtors = new Map<ComponentCtor, Player>();
            componentsToInsert
                .filter((context) => BIDIRECTIONAL_COMPONENTS.has(context[0]))
                .forEach((context) => {
                    const Ctor = context[0];
                    doNotReplicatePlayersOfCtors.set(Ctor, player as Player);
                });
            componentsToRemove
                .filter((Ctor) => BIDIRECTIONAL_COMPONENTS.has(Ctor))
                .forEach((Ctor) => {
                    doNotReplicatePlayersOfCtors.set(Ctor, player as Player);
                });

            if (doNotReplicatePlayersOfCtors.size() > 0) {
                w.insert(e, DoNotReplicate({ playersOfCtors: doNotReplicatePlayersOfCtors }));
            }
        }
    }
}

export = { system: recieveSync, before: replication };
