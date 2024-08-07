import { World } from "@rbxts/matter";
import { Dummy, Plr, Sound, Transform } from "shared/components";
import { Damage } from "shared/components/health";
import { hasComponents } from "shared/hooks/components";

function physicalDamageMakeSound(w: World) {
    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;

        const damage = damageRecord.new;
        if (damage === undefined) continue;

        if (damage.damageType !== "physical") continue;

        const transform = w.get(e, Transform);
        if (!transform) continue;

        if (hasComponents(w, e, Plr)) {
            w.spawn(
                Sound({
                    audibility: 1,
                    context: {
                        volume: 1,
                        soundName: "plrDamage",
                        speed: 1,
                    },
                    cf: transform.cf,
                }),
            );
        } else if (hasComponents(w, e, Dummy)) {
            w.spawn(
                Sound({
                    audibility: 1,
                    context: {
                        volume: 1,
                        soundName: "dummyDamage",
                        speed: 1,
                    },
                    cf: transform.cf,
                }),
            );
        }
    }
}

export = physicalDamageMakeSound;
