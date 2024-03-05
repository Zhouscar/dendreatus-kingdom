import { World, useThrottle } from "@rbxts/matter";
import { Damage, Dead, Health } from "shared/components/health";
import { Stomach } from "shared/components/hunger";

const RATE = 2;
const DAMAGE_AMOUNT = 0.5;

function emptyStomachHurts(w: World) {
    if (!useThrottle(1 / RATE)) return;

    for (const [e, stomach, health] of w.query(Stomach, Health).without(Dead)) {
        if (stomach.hunger > 0) continue;

        w.insert(
            e,
            Damage({
                amount: DAMAGE_AMOUNT,
                damageType: "passive",
            }),
        );
    }
}

export = emptyStomachHurts;
