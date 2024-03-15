import { World } from "@rbxts/matter";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { Dummy, Plr, Sound, Transform } from "shared/components";
import { Damage } from "shared/components/health";
import { hasComponents } from "shared/hooks/components";

const plrDamageSoundId = withAssetPrefix("5634710863");
const dummyDamageSound = withAssetPrefix("5634710863");

function physicalDamageMakeSound(w: World) {
    for (const [e, damageRecord] of w.queryChanged(Damage)) {
        if (!w.contains(e)) continue;
        if (!damageRecord.new) continue;

        if (damageRecord.new.damageType !== "physical") continue;

        const transform = w.get(e, Transform);
        if (!transform) continue;

        if (hasComponents(w, e, Plr)) {
            w.spawn(
                Sound({
                    audibility: 1,
                    context: {
                        volume: 1,
                        soundId: plrDamageSoundId,
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
                        soundId: dummyDamageSound,
                        speed: 1,
                    },
                    cf: transform.cf,
                }),
            );
        }
    }
}

export = physicalDamageMakeSound;
