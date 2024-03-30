import { AnyEntity, World } from "@rbxts/matter";
import { useChange, useMap } from "@rbxts/matter-hooks";
import { index } from "shared/calculations/indexing";
import { LocalPlr, Plr, Renderable } from "shared/components";
import { Acting } from "shared/components/actions";
import { Health } from "shared/components/health";
import { PhysicallyEquipping } from "shared/components/items";
import { cast } from "shared/effects/raycastHitbox";
import { ITEM_ATTACKABLE_CONTEXTS } from "shared/features/items/attackables";
import { hasComponents } from "shared/hooks/components";
import { State } from "shared/state";
import { routes } from "shared/routes";

function itemsAttackingRaycastHitbox(w: World, s: State) {
    for (const [e, localPlr, acting, renderable, physicallyEquipping] of w.query(
        LocalPlr,
        Acting,
        Renderable,
        PhysicallyEquipping,
    )) {
        if (acting.action.type !== "attacking") continue;

        const itemType = acting.action.item.itemType;
        const context = ITEM_ATTACKABLE_CONTEXTS.get(itemType);
        if (!context) continue;

        const tool = physicallyEquipping.tool;
        const hitbox = index<BasePart>(tool, context.toolHitboxDirectory);
        assert(hitbox, "Can't index hitbox");

        const eAttackeds = useMap(e, new Set<AnyEntity>());

        if (useChange([acting.action.startTime], e)) {
            eAttackeds.value = new Set();
        }

        cast(
            w,
            hitbox,
            0.1,
            {
                hostE: e,
            },
            (entities, parts) => {
                entities.forEach((e) => {
                    if (!w.contains(e)) return;
                    if (!hasComponents(w, e, Health)) return;
                    if (eAttackeds.value.has(e)) return;

                    eAttackeds.value.add(e);

                    const serverE = s.clientToServerEntityIdMap.get(tostring(e));
                    if (serverE === undefined) return;

                    // network.ecs.playerDamage.fire(serverE, itemType);
                    routes.playerDamage.send(serverE, itemType);
                });
            },
        );
    }
}

export = { system: itemsAttackingRaycastHitbox, event: "onPhysics" };
