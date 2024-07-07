import { AnyEntity, World } from "@rbxts/matter";
import { useChange, useMap } from "@rbxts/matter-hooks";
import { LocalPlr, Renderable, SafeZone } from "shared/components";
import { Acting } from "shared/components/actions";
import { Damage, Health } from "shared/components/health";
import { PhysicallyEquipping } from "shared/components/items";
import { cast } from "shared/effects/raycastHitbox";
import { ITEM_ATTACKABLE_CONTEXTS } from "shared/features/items/attackables";
import { isItemAttackableType } from "shared/features/items/types";
import { hasComponents } from "shared/hooks/components";
import { State } from "shared/state";

function itemsAttackingRaycastHitbox(w: World, s: State) {
    for (const [e, localPlr, acting, renderable, physicallyEquipping] of w.query(
        LocalPlr,
        Acting,
        Renderable,
        PhysicallyEquipping,
    )) {
        if (acting.action.type !== "attacking") continue;

        const serverE = s.clientToServerEntityIdMap.get(tostring(e));
        if (serverE === undefined) continue;

        const itemType = acting.action.item.itemType;
        if (!isItemAttackableType(itemType)) continue;

        const tool = physicallyEquipping.tool;

        const eAttackeds = useMap(e, new Set<AnyEntity>());

        if (useChange([acting.action.startTime], e)) {
            eAttackeds.value = new Set();
        }

        cast(
            w,
            tool,
            0.1,
            {
                hostE: e,
            },
            (entities, parts) => {
                entities.forEach((e) => {
                    if (!w.contains(e)) return;
                    if (!hasComponents(w, e, Health)) return;
                    if (hasComponents(w, e, SafeZone)) return;
                    if (eAttackeds.value.has(e)) return;

                    eAttackeds.value.add(e);

                    const damageAmount = ITEM_ATTACKABLE_CONTEXTS[itemType].damage;
                    assert(damageAmount);

                    w.insert(
                        e,
                        Damage({
                            time: os.clock(),
                            amount: damageAmount,
                            serverContributor: serverE,
                            damageType: "physical",
                        }),
                    );
                });
            },
        );
    }
}

export = { system: itemsAttackingRaycastHitbox, event: "onPhysics" };
