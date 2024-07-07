import { World, useThrottle } from "@rbxts/matter";
import { Collision } from "shared/components";
import { TestDamagePart } from "shared/components/colliders";
import { Damage, Dead, Health } from "shared/components/health";
import { hasComponents, hasOneOfComponents } from "shared/hooks/components";
import { State } from "shared/state";

function testDamagePartsDamage(w: World, s: State) {
    for (const [e, collisionRecord] of w.queryChanged(Collision)) {
        if (!w.contains(e)) continue;
        if (collisionRecord.new === undefined) continue;

        if (!hasComponents(w, e, TestDamagePart)) continue;

        const colliderE = collisionRecord.new.colliderE;

        if (!w.contains(colliderE)) continue;
        if (!hasComponents(w, colliderE, Health)) continue;
        if (hasOneOfComponents(w, colliderE, Dead)) continue;

        if (!useThrottle(0.5, colliderE)) continue;

        w.insert(
            colliderE,
            Damage({
                time: tick(),
                amount: 10,
                serverContributor: e,
                damageType: "physical",
            }),
        );
    }
}

export = testDamagePartsDamage;
