import { produce } from "@rbxts/immut";
import { AnyEntity, World } from "@rbxts/matter";
import { Damage, Dead, Health } from "shared/components/health";
import { hasComponents } from "shared/hooks/components";

function calculateNewCurrentHealth(e: AnyEntity, health: Health, damage: Damage): number {
    if (damage.amount <= 0) return health.current;
    return math.max(0, health.current - damage.amount);
}

function damageHurts(w: World) {
    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (damageRecord.new === undefined) continue;

        const health = w.get(e, Health);
        if (health === undefined) {
            w.remove(e, Damage);
            continue;
        }

        if (hasComponents(w, e, Dead)) continue;

        const newCurrentHealth = calculateNewCurrentHealth(e, health, damageRecord.new);
        const newDamageContributors = produce(health.damageContributors, (draft) => {
            const contributor = damageRecord.new!.serverContributor;
            if (contributor === undefined) return;

            let damageAlreadyDone = draft.get(contributor);
            if (damageAlreadyDone === undefined) {
                damageAlreadyDone = 0;
                draft.set(contributor, damageAlreadyDone);
            }

            const damageAmount = damageRecord.new!.amount;
            draft.set(contributor, damageAlreadyDone + damageAmount);
        });

        w.insert(
            e,
            health.patch({
                current: newCurrentHealth,
                damageContributors: newDamageContributors,
            }),
        );
    }
}

export = damageHurts;
